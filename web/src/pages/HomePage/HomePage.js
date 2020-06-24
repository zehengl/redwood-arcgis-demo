import { useEffect, useRef } from 'react'
import { loadModules } from 'esri-loader'
import AppLayout from 'src/layouts/AppLayout'

const HomePage = () => {
  const mapRef = useRef()
  const baseUrl = 'http://localhost:8910'

  useEffect(() => {
    loadModules(
      [
        'esri/Map',
        'esri/layers/TileLayer',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/tasks/Locator',
        'esri/layers/MapImageLayer',
      ],
      {
        css: true,
      }
    ).then(([Map, TileLayer, MapView, Search, Locator, MapImageLayer]) => {
      const map = new Map()

      const basemap = new TileLayer({
        url:
          'http://gis.calgary.ca/arcgis/rest/services/pub_Basemap/CalgaryBasemap_WMASP_PNG/MapServer',
      })
      const solar = new MapImageLayer({
        url:
          'http://gis.calgary.ca/arcgis/rest/services/pub_CalgaryDotCa/SolarPotential/MapServer',
      })
      map.layers.add(basemap)
      map.add(solar)

      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-114.08529, 51.05011],
        zoom: 10,
      })
      const search = new Search({
        sources: [
          {
            locator: new Locator({
              url:
                'http://gis.calgary.ca/arcgis/rest/services/pub_Locators/CalgaryUniversalLocator/GeocodeServer',
            }),
            singleLineFieldName: 'SingleLine',
            name: 'City of Calgary Geocoding Service',
            placeholder: 'Please type your address',
            maxResults: 3,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0,
          },
        ],
        includeDefaultSources: false,
        view: view,
      })
      view.ui.add(search, 'top-right')

      view.on('click', (evt) => {
        search.clear()
        view.popup.clear()

        if (search.activeSource) {
          const geocoder = search.activeSource.locator
          const params = {
            location: evt.mapPoint,
          }
          geocoder.locationToAddress(params).then(
            (response) => {
              const address = response.address
              showPopup(address, evt.mapPoint)
            },
            (err) => {
              showPopup('No address found.', evt.mapPoint)
            }
          )
        }
      })

      const showPopup = (address, pt) => {
        const id = btoa(address)
        view.popup.open({
          title: address,
          content: `<a class="bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded" target='_blank' href='${baseUrl}/locations/${id}'>See detail.</a>`,
          location: pt,
        })
      }

      return () => {
        if (view) {
          view.container = null
        }
      }
    })
  })

  return (
    <AppLayout>
      <div className="webmap" ref={mapRef} />
    </AppLayout>
  )
}

export default HomePage
