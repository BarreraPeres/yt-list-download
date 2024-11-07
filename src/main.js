import './index.css'
import { endLoader, startLoader } from './utils/loader.js'
import { apiYoutube } from './lib/api-youtube.js'
import { queue } from './lib/queue.js'
import { getIdByLink } from './utils/get-id-by-link.js'

document.querySelector('#app').innerHTML = `

  <form id="FormYT" class="flex mb-6">    
    <input 
    class="text-sm text-zinc-300 border border-emerald-800 hover:border-emerald-950 rounded-lg hover:bg-emerald-950 bg-emerald-900 focus:ring-emerald-950 focus:border-emerald-950 p-3 ps-10 w-[540px]"
    placeholder="Link da playlist do youtube... "
    id="link"
    > 
      <button class="bg-emerald-900 py-4 px-8 rounded-md ml-1 hover:bg-emerald-950">
      <svg class="text-zinc-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>
      </button>
      </input> 
  </form>

  <div id="ytvideo" class="flex w-[640px] h-[360px] bg-zinc-900 rounded-lg aspect-video"></div>
  
`

document.getElementById("FormYT").addEventListener("submit", async (e) => {
  e.preventDefault()
  const url = document.getElementById("link").value
  const { id_playlist } = await getIdByLink(url)

  try {
    await startLoader()
    await apiYoutube(id_playlist)
    await queue()
  } catch (e) {
    console.log(e)
  } finally {
    endLoader()
  }

})

