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
        this.isTouchDevice = "ontouchstart" in document.documentElement;
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
        if (this.isAlreadyClicked) {
            document.getElementById('tooltip-text').innerText = 'Follow me on Twitter !';
            InitScripts.updateSVGDataSet(InitScripts.getRelevantCoordinates('twitter'));
            // document.getElementsByClassName('navigation')[0].removeEventListener('mouseleave', this.eventForMouseLeave)
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

    static updateSVGDataSet(dataSet) {
        console.log(dataSet);
        document.getElementsByClassName('line-up')[0].setAttribute('d',dataSet.lineUp); // st10
        document.getElementsByClassName('line-down')[0].setAttribute('d',dataSet.lineDown); // st1
        document.getElementsByClassName('shape')[0].setAttribute('d',dataSet.shape); // st0
    }

    static getRelevantCoordinates(classListName) {
        let dataSet;
        if (classListName === 'behance') {
            dataSet = {
                name: 'behance',
                lineUp: "M0,12.6 137.5,12.6 150,0.6 161.8,12.6 300,12.6 ",
                lineDown: "M0,83.4 137.5,83.4 150,83.4 161.8,83.4 300,83.4",
                shape: "M300,83.4 161.8,83.4 150,83.4 137.5,83.4 0,83.4 0,12.6 137.5,12.6 150,0.6 161.8,12.6 300,12.6 z"
            }
        } else if (classListName === 'twitter') {
            dataSet = {
                name: 'twitter',
                lineUp: "M0,12.6 192.5,12.6 205,0.6 216.8,12.6 300,12.6 ",
                lineDown: "M0,83.4 137.5,83.4 150,83.4 161.8,83.4 300,83.4 ",
                shape: "M300,83.4 161.8,83.4 150,83.4 137.5,83.4 0,83.4 0,12.6 192.5,12.6 205,0.6 216.8,12.6 300,12.6 z"
            }
        } else if (classListName === 'github') {
            dataSet = {
                name: 'github',
                lineUp: "M0,12.6 83.5,12.6 96,0.6 107.8,12.6 300,12.6 ",
                lineDown: "M0,83.4 137.5,83.4 150,83.4 161.8,83.4 300,83.4 ",
                shape: "M300,83.4 161.8,83.4 150,83.4 137.5,83.4 0,83.4 0,12.6 83.5,12.6 96,0.6 107.8,12.6 300,12.6 z"
            }
        } else {
            dataSet = {
                name: 'heart',
                lineUp: "M0,12.6 137.5,12.6 150,12.6 161.8,12.6 300,12.6 ",
                lineDown: "M0,83.4 137.5,83.4 150,95.4 161.8,83.4 300,83.4 ",
                shape: "M300,83.4 161.8,83.4 150,95.4 137.5,83.4 0,83.4 0,12.6 137.5,12.6 150,12.6 161.8,12.6 300,12.6 z"
            }
        }
        return dataSet
    }

    toggleTooltipClassNamesOnHover() {
        const hoveredElements = document.querySelectorAll('.more');
        const navigation = document.getElementsByClassName('navigation')[0];
        hoveredElements.forEach( element => {
            let classListName = element.querySelector('figure').className;
            element.addEventListener('mouseenter', () => {
                InitScripts.updateSVGDataSet(InitScripts.getRelevantCoordinates(classListName));
                document.getElementById('tooltip-text').innerText =
                    `Follow me on ${classListName.replace(/^\w/, (chr) => {
                        return chr.toUpperCase();
                    })} !`
            });
        });
        navigation.addEventListener('mouseleave', this.eventForMouseLeave);
    }

    eventForMouseLeave() {
        document.getElementsByClassName('tooltip')[0].className = 'tooltip';
        document.getElementById('tooltip-text').innerText = 'Click to change the mood!';
        InitScripts.updateSVGDataSet(InitScripts.getRelevantCoordinates(null))
    }
}
