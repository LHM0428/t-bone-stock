import React, { Component } from "react";

class App extends Component {
  render() {
    return <div>
      <div class="py-12 px-12 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-10 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <img class="h-24 w-24" src="https://media-cdn.tripadvisor.com/media/photo-s/06/70/e1/dd/lau-dai-vang.jpg" alt="tbonestock Logo"/>
        <div>
          <div class="text-xl font-medium text-black">T-bone stock</div>
          <p class="text-gray-500">You must be free from the money to eat T-bone steak</p>
        </div>
      </div>
    </div>
  }
}

export default App;
