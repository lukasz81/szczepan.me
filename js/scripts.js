export class InitScripts {

    constructor(Gradient) {
        //super();
        this.ROLE_TEXT_SWITCH = 4000;
        this.DEF_DELAY = 300;
        this.roles = [
            'UX Designer',
            'UI Designer',
            'UI Developer',
            'Front End Developer',
            'Designer',
            'UI Engineer',
            'Web Designer',
            'Web Developer',
            'Coder',
            'Human'
        ];
        this.Gradient = Gradient;
        console.log('Gradient: ',this.Gradient);
    }

    static toggleElementsClassNames() {
        const elements = '.outer , .inner , .heart';
        const elementsList = document.querySelectorAll(elements);
        const elementsArray = Array.from(elementsList);
        elementsArray.forEach(element => {
            element.classList.toggle('active');
        });
    };

    changRoleText() {
        setInterval(() => {
            const roleElem = document.querySelector('.role');
            const roles = this.roles;
            const role = roles[Math.floor(Math.random() * roles.length)];
            const text = `${role}.`;
            roleElem.innerHTML = text;
            roleElem.setAttribute('data-text', ' ');

            let attributeHandler = setInterval(() => {
                roleElem.setAttribute('data-text', text);
                clearInterval(attributeHandler);
                attributeHandler = false;
            }, this.ROLE_TEXT_SWITCH * 0.75);

        }, this.ROLE_TEXT_SWITCH);
    };

    addEventsToHeartButton() {
        const heartElem = document.querySelector('.heart');
        const innerElm = document.querySelector('.inner');
        heartElem.addEventListener('click', () => {
            InitScripts.toggleElementsClassNames();
            setTimeout(() => {
                Gradient.startTransition(false);
                innerElm.classList.add('active');
            }, this.DEF_DELAY);
        })
    };

    addBrowserSupportClasses() {
        const HTMLElem = document.getElementsByTagName('html')[0];
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (CSS.supports('display', 'grid')) {
            HTMLElem.classList.add('css-grid');
        }
        if (CSS.supports('--fake-var', 0) || isSafari) {
            HTMLElem.classList.add('css-variables');
            Gradient.supportsCssVars = true;
        }
    };

    startInitialTransition(isOnLoad) {
        Gradient.startTransition(isOnLoad);
    }


}
