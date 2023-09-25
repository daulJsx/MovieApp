class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <nav
            class="w-full flex flex-col items-center justify-between px-5 py-3 md:flex-row md:items-center md:py-7 lg:px-20">
            <a href="#" class="flex items-center">
                <img src="./assets/images/movie.png" class="h-8 mr-3" alt="Movie Apps" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">dMovie</span>
            </a>
            <div class="flex items-center">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pt-0.5 text-gray-600" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input class="ml-2 outline-none bg-transparent text-white" type="text" name="search" id="search"
                        placeholder="Search a movie by title" />
                </div>
            </div>
        </nav>
    `;
  }
}

customElements.define("app-bar", AppBar);
