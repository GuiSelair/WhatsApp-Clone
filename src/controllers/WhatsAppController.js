
class WhatsAppController {

    constructor() {
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    initEvents() {
        // UNS DOS MÉTOOS PRINCIPAIS RESPONSAVEL PELA INSTANCIA DE 
        // EVENTOS EM DIVERSOS ELEMENTOS.
        this.el.myPhoto.on("click", event => {
            this.closeAllLeftPanel()
            this.el.panelEditProfile.show()
            setTimeout(() => {
                this.el.panelEditProfile.addClass("open")
            }, 300)
        })

        this.el.btnNewContact.on("click", event => {
            this.closeAllLeftPanel()
            this.el.panelAddContact.show()
            setTimeout(() => {
                this.el.panelAddContact.addClass("open")
            }, 300)
        })

        this.el.btnClosePanelEditProfile.on("click", event => {
            this.el.panelEditProfile.removeClass("open")
        })

        this.el.btnClosePanelAddContact.on("click", event => {
            this.el.panelAddContact.removeClass("open")
        })

        this.el.photoContainerEditProfile.on("click", event => {
            this.el.inputProfilePhoto.click();
        })

        this.el.inputNamePanelEditProfile.on("keypress", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.el.btnSavePanelEditProfile.click()
            }
        })

        this.el.btnSavePanelEditProfile.on("click", event => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        })

        this.el.formPanelAddContact.on("submit", event => {
            event.preventDefault();
            console.log(this.el.formPanelAddContact.toJSON())
            this.el.formPanelAddContact.reset();
        })

        this.el.contactsMessagesList.querySelectorAll(".contact-item").forEach(message => {
            message.on("click", () => {
                this.el.home.hide()
                this.el.main.css({
                    display: 'flex'
                })
            })
        })

        this.el.btnAttach.on("click", (event) => {
            event.stopPropagation()
            this.el.menuAttach.addClass("open")
            document.addEventListener("click", this.closeMenuAttach.bind(this))
        })

        // this.btnAttachPhoto.on("click", () => { })

        // this.btnAttachDocument.on("click", () => { })

        // this.btnAttachCamera.on("click", () => { })

        // this.btnAttachContact.on("click", () => { })

    }

    closeMenuAttach(event) {
        document.removeEventListener("click", this.closeAllLeftPanel)
        this.el.menuAttach.removeClass("open")
    }

    closeAllLeftPanel() {
        // MÉTODO RESPONSAVEL POR FECHAR TODOS OS PAINEIS LATERAIS
        // POSSIBILITANDO A ABERTURA DE OUTRO PAINEL.

        this.el.panelEditProfile.hide()
        this.el.panelAddContact.hide()
    }

    loadElements() {
        // MÉTODO RESPONSAVEL POR ESTANCIAR TODOS OS ELEMENTOS QUE
        // TIVERAM ID NO FORMATO CAMELCASE. TODOS OS ELEMENTOS FICAM 
        // DISPONIVEIS EM app.el

        this.el = {}
        document.querySelectorAll("[id]").forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    elementsPrototype() {
        // MÉTODO RESPONSAVEL POR CRIAR METODOS NO PROTOTYPE NO JS
        // PARA SIMPLIFICAÇÃO E RAPIDEZ DO CÓDIGO.

        Element.prototype.hide = function () {
            this.style.display = "none"
            return this;
        }

        Element.prototype.show = function () {
            this.style.display = "block"
            return this;
        }

        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === "none") ? "block" : "none";
            return this;
        }

        Element.prototype.on = function (events, fn) {
            const eventList = events.split(" ");
            eventList.forEach(event => {
                this.addEventListener(event, fn);
            })
            return this;
        }

        Element.prototype.css = function (styles) {
            for (let name in styles) {
                this.style[name] = styles[name]
            }
            return this;
        }

        Element.prototype.addClass = function (className) {
            this.classList.add(className);
            return this;
        }

        Element.prototype.removeClass = function (className) {
            this.classList.remove(className);
            return this;
        }

        Element.prototype.toggleClass = function (className) {
            this.classList.toggle(className);
            return this;
        }

        Element.prototype.hasClass = function (className) {
            return this.classList.contains(className);
        }

        HTMLFormElement.prototype.getForm = function () {
            return new FormData(this)
        }

        HTMLFormElement.prototype.toJSON = function () {
            const json = {}
            this.getForm().forEach((value, key) => {
                json[key] = value
            })
            return json
        }

    }
}