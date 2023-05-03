function getTemplate(state) {
    return `<div class="slider_before" style="width: ${state.width}px; background-image: url(${state.before})">
        <div class="slider_resize" data-type="resize" ></div>
    </div>
    <div class="slider_after" style="background-image: url(${state.after})"></div>`;
}

class Slider {
    constructor(selector, state) {
        this.$slider = document.getElementById(selector)
        this.state = {
            ...state,
            width: state.width || 512
        }
        this.#render(this.state)
        this.#listen()
    }
    #render(state) {
        this.$slider.innerHTML = getTemplate(state)
    }

    #update(props) {
        this.state = {
            ...this.state,
            ...props,
        }
        this.#render(this.state)
    }

    #listen() {
        this.mouseDownHundler = this.mouseDownHundler.bind(this)
        this.mouseUpHandler = this.mouseUpHandler.bind(this)
        this.moveHundler = this.moveHundler.bind(this)
        this.$slider.addEventListener('mousedown', this.mouseDownHundler)
        this.$slider.addEventListener('mouseup', this.mouseUpHandler)
    }
    mouseDownHundler(event) {
        if (event.target.dataset.type === 'resize') {
            this.$slider.addEventListener('mousemove', this.moveHundler)
            this.currentClientX = event.clientX
        }
     }
    mouseUpHandler(event) {
        this.$slider.removeEventListener('mousemove', this.moveHundler)
     }
    moveHundler(event) {
        let newClientX = this.currentClientX - event.clientX
        this.#update({ width:this.state.width - newClientX })
        this.currentClientX = event.clientX
        // console.log(newClientX)
    }
}
const slider = new Slider('slider', {
    after: './krasny.jpg',
    before: './sinyi.jpg'
});