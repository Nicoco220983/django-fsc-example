const FscExampleHtml = `
    <style>
        :host {
            display: block;
            padding: .5em;
            border: 1px dashed lightgrey;
        }
        :host(.edited) {
            background-color: lightyellow;
        }
    </style>
    <slot></slot>
`

class FscExampleElement extends HTMLElement {
    getBaseUrl(){
        return this.getAttribute('base-url') || '/fscex'
    }
    getKey(){
        const key = this.getAttribute('key')
        if(!key) throw new Error("fsc-example 'key' attribute is mandatory")
        return key
    }
    getInitFetch(){
        return this.getAttribute("init-fetch") !== "false"
    }
    connectedCallback(){
        this.initHtml()
        this.initActions()
        if(this.getInitFetch())
            this.sync()
    }
    initHtml() {
        const shdw = this.attachShadow({mode: 'open'})
        shdw.innerHTML = FscExampleHtml
        this.contentEditable = true
    }
    initActions(){
        const debouncedPostContent = debounce(500, () => this.postContent())
        this.oninput = () => {
            this.setEdited(true)
            debouncedPostContent()
        }
    }
    setEdited(val){
        if(this.edited == val) return
        this.edited = val
        if(val) this.classList.add("edited")
        else this.classList.remove("edited")
    }
    async sync() {
        const res = await fetchJson(`${this.getBaseUrl()}/_ajax/data/${this.getKey()}`)
        this.textContent = res.jsonData.content
    }
    async postContent() {
        const res = await fetchJson(`${this.getBaseUrl()}/_ajax/data/${this.getKey()}`, {
            method: 'POST',
            json: { content: this.textContent }
        })
        if(res.jsonData.done) this.setEdited(false)
    }
}
customElements.define("fsc-example", FscExampleElement)

// utils

async function fetchJson(url, args) {
    if(args && args.json){
        args.headers = args.headers || {}
        args.headers['Content-Type'] = 'application/json'
        args.body = JSON.stringify(args.json)
        delete args.json
    }
	const res = await fetch(url, args)
	const resContentType = res.headers.get("content-type")
	if(resContentType.indexOf("application/json") >= 0)
		res.jsonData = await res.json()
	return res
}

function debounce(timeout, func) {
    let timer
    return () => {
        clearTimeout(timer)
        timer = setTimeout(func, timeout)
    }
}