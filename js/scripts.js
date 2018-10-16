export class InitScripts {

    constructor(Gradient) {
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
        this.willSupportSvgMorphing = /Chrome/i.test(navigator.userAgent) && !("ontouchstart" in document.documentElement);
        this.isAlreadyClicked = false;
    }

    static toggleElementsClassNames() {
        const elements = '.outer , .inner , .heart';
        const elementsList = document.querySelectorAll(elements);
        const elementsArray = Array.from(elementsList);
        elementsArray.forEach(element => {
            element.classList.toggle('active');
        });
    };

    static pickRandomRole(roles) {
        return roles[Math.floor(Math.random() * roles.length)]
    }

    changRoleText() {
        setInterval(() => {
            const roleElem = document.querySelector('.role');
            const roles = this.roles;
            const role = InitScripts.pickRandomRole(roles);
            const text = `${role}.`;
            roleElem.innerHTML = text;
            roleElem.setAttribute('data-text', ' ');

            let attributeHandler = setInterval(() => {
                roleElem.setAttribute('data-text', text);
                clearInterval(attributeHandler);
                attributeHandler = false;
            }, this.ROLE_TEXT_SWITCH * 0.3);

        }, this.ROLE_TEXT_SWITCH);
    };

    addEventsToHeartButton() {
        const heartElem = document.querySelector('.heart');
        const innerElm = document.querySelector('.inner');
        heartElem.addEventListener('click', () => {
            this.isAlreadyClicked = true;
            InitScripts.toggleElementsClassNames();
            setTimeout(() => {
                this.Gradient.startTransition(false);
                innerElm.classList.add('active');
                this.modifyTooltipOnClick();
            }, this.DEF_DELAY);

        })
    };

    modifyTooltipOnClick() {
        if (this.isAlreadyClicked && this.willSupportSvgMorphing) {
            document.getElementsByClassName('tooltip')[0].classList.add('twitter-hovered');
            document.getElementById('tooltip-text').innerText = 'Follow me on Twitter !';
            document.getElementsByClassName('navigation')[0].removeEventListener('mouseleave',this.eventForMouseLeave)
        } else if (this.isAlreadyClicked && !this.willSupportSvgMorphing) {
            document.getElementsByTagName('main')[0].classList.add('no-svg-morphing')
        }
    }

    addBrowserSupportClasses() {
        const HTMLElem = document.getElementsByTagName('html')[0];
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if (CSS.supports('display', 'grid')) {
            HTMLElem.classList.add('css-grid');
        }
        if (CSS.supports('--fake-var', 0) || isSafari) {
            HTMLElem.classList.add('css-variables');
            this.Gradient.supportsCssVars = true;
        }
    };

    startInitialTransition(isOnLoad) {
        this.Gradient.startTransition(isOnLoad);
    }

    toggleTooltipClassNamesOnHover() {
        const hoveredElements = document.querySelectorAll('.more');
        const targetElement = document.getElementsByClassName('tooltip')[0];
        const content = document.getElementsByClassName('navigation')[0];
        hoveredElements.forEach( element => {
            if (this.willSupportSvgMorphing === false) return;
            let classListName = element.querySelector('figure').className;
            element.addEventListener('mouseenter', () => {
                targetElement.className = 'tooltip';
                targetElement.classList.add(classListName + '-hovered');
                document.getElementById('tooltip-text').innerText =
                    `Follow me on ${classListName.replace(/^\w/, (chr) => {
                        return chr.toUpperCase();
                    })} !`
            });
        });
        content.addEventListener('mouseleave', this.eventForMouseLeave);
    }

    eventForMouseLeave() {
        document.getElementsByClassName('tooltip')[0].className = 'tooltip';
        document.getElementById('tooltip-text').innerText = 'Click to change the mood!';
    }
}
