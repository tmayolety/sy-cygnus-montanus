



components.trueWind = {
    props: ['signalIdOptionOne', 'signalIdOptionTwo', 'valueMode', 'valueDecimals'],
    template:/*html*/ `
    <div class="ui col mini-1" ref="trueWindElement">
    <div class="col-content">

        <div class="wind-gauge-bg">
            <i class="ui icon-size-230">
                <svg class="ui icon wind-gauge" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g id="wind-gauge"><path id="right" class="" d="M50,.48V11.6A38.36,38.36,0,0,1,83.3,30.9l9.63-5.56A49.48,49.48,0,0,0,50,.48Z"></path><path id="left" class="" d="M50,.48V11.6A38.36,38.36,0,0,0,16.7,30.9L7.07,25.34A49.48,49.48,0,0,1,50,.48Z"></path><circle class="circle-center" cx="50" cy="50" r="28.52"></circle><g id="circle-3" data-name="circle"><path d="M50,1A49,49,0,1,1,1,50,49.05,49.05,0,0,1,50,1m0-1a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z"></path></g><g id="small"><path d="M32.09,16l-.52-1-.23.12.51,1Z"></path><path d="M29.76,17.33l-.58-.93-.23.14.59.94Z"></path><path d="M23.42,22.26l-.77-.79-.19.18.76.79Z"></path><path d="M33.28,15.39l-.47-1-.24.11.48,1A2.53,2.53,0,0,1,33.28,15.39Z"></path><path d="M26.46,19.63l-.68-.87-.21.17.68.87Z"></path><path d="M28.63,18.06,28,17.15l-.22.15.61.9Z"></path><path d="M24.4,21.35l-.74-.82-.2.18.74.81Z"></path><path d="M25.41,20.47l-.7-.84-.21.17.71.84Z"></path><path d="M27.53,18.83l-.64-.9-.22.16.65.89Z"></path><path d="M35.74,14.31l-.41-1-.25.1.41,1Z"></path><path d="M34.51,14.83l-.45-1-.25.1.45,1Z"></path><path d="M44.8,11.93l-.15-1.1-.27,0L44.54,12Z"></path><path d="M37,13.83l-.37-1-.25.09.37,1Z"></path><path d="M43.48,12.13,43.28,11l-.26.05.19,1.09Z"></path><path d="M48.81,11.6l0-1.12H48.5l0,1.12Z"></path><path d="M47.47,11.66l-.08-1.11-.26,0,.07,1.11Z"></path><path d="M46.13,11.76,46,10.66l-.27,0,.12,1.1Z"></path><path d="M38.27,13.4l-.34-1-.26.08L38,13.49Z"></path><path d="M42.16,12.37l-.23-1.07-.26,0,.23,1.08Z"></path><path d="M39.55,13,39.25,12,39,12l.3,1.06Z"></path><path d="M40.85,12.67l-.27-1.07-.26.07.27,1.06Z"></path><path d="M14.42,35.47l-1-.41-.1.25,1,.41A2.6,2.6,0,0,1,14.42,35.47Z"></path><path d="M13.1,39.27l-1-.3-.07.26,1,.3Z"></path><path d="M12.74,40.57l-1.05-.27-.07.26,1.06.27Z"></path><path d="M12.44,41.87l-1.07-.22,0,.26,1.06.22Z"></path><path d="M13.93,36.72l-1-.37-.09.25,1,.37Z"></path><path d="M13.49,38l-1-.34-.08.26,1,.33A2.41,2.41,0,0,1,13.49,38Z"></path><path d="M11.61,48.52l-1.1,0v.27l1.1,0A2.44,2.44,0,0,1,11.61,48.52Z"></path><path d="M11.68,47.18l-1.09-.07,0,.26,1.09.08A2.45,2.45,0,0,0,11.68,47.18Z"></path><path d="M12.18,43.19,11.11,43l0,.26,1.07.19A2,2,0,0,0,12.18,43.19Z"></path><path d="M12,44.52l-1.08-.16,0,.27,1.08.15Z"></path><path d="M11.8,45.85l-1.09-.12,0,.27,1.08.11C11.77,46,11.79,45.94,11.8,45.85Z"></path><path d="M15,34.24l-1-.44-.1.24,1,.44Z"></path><path d="M22.46,23.2l-.79-.76-.19.19.8.77Z"></path><path d="M19.81,26.23l-.87-.68-.16.21.87.68Z"></path><path d="M18.22,28.39l-.9-.61-.15.22.9.61Z"></path><path d="M20.66,25.19l-.84-.71-.17.21.83.7Z"></path><path d="M21.54,24.18l-.81-.74-.18.2.81.74Z"></path><path d="M19,27.3l-.89-.65-.16.22.89.64Z"></path><path d="M17.49,29.51l-.93-.58-.14.23.92.58Z"></path><path d="M16.13,31.83l-1-.51-.12.24,1,.51Z"></path><path d="M15.52,33l-1-.47-.12.24,1,.47Z"></path><path d="M81.94,28.63l.93-.63-.15-.22-.93.62Z"></path><path d="M84,32.08l1-.52-.13-.24-1,.52Z"></path><path d="M82.66,29.75l1-.59-.15-.23-1,.6Z"></path><path d="M85.16,34.5l1-.46-.11-.24-1,.45C85.09,34.33,85.13,34.41,85.16,34.5Z"></path><path d="M84.61,33.27l1-.48-.12-.24-1,.49Z"></path><path d="M81.17,27.53l.91-.66-.16-.22-.91.66C81.07,27.38,81.12,27.46,81.17,27.53Z"></path><path d="M78.65,24.39l.84-.75-.18-.2-.83.75C78.54,24.26,78.59,24.33,78.65,24.39Z"></path><path d="M79.53,25.41l.86-.72-.17-.21-.87.73Z"></path><path d="M80.37,26.46l.88-.7-.16-.21-.89.7Z"></path><path d="M85.68,35.73l1-.42-.1-.25-1,.42Z"></path><path d="M51.49,11.61l0-1.12h-.27l0,1.12Z"></path><path d="M87,39.54l1.08-.31L88,39l-1.07.31A2.5,2.5,0,0,0,87,39.54Z"></path><path d="M88.07,44.78l1.12-.15,0-.27L88,44.52Z"></path><path d="M87.87,43.46l1.1-.2,0-.26-1.11.2C87.83,43.28,87.85,43.37,87.87,43.46Z"></path><path d="M88.24,46.12,89.35,46l0-.27-1.11.12A2.48,2.48,0,0,0,88.24,46.12Z"></path><path d="M88.34,47.45l1.13-.08,0-.26-1.13.08A2.46,2.46,0,0,0,88.34,47.45Z"></path><path d="M88.4,48.79l1.13,0v-.27l-1.13,0A2.44,2.44,0,0,1,88.4,48.79Z"></path><path d="M86.6,38.25l1.06-.34-.08-.26L86.51,38Z"></path><path d="M86.17,37l1-.38-.09-.25-1,.38Z"></path><path d="M77.74,23.41l.81-.78-.19-.19-.81.78C77.62,23.28,77.68,23.35,77.74,23.41Z"></path><path d="M87.62,42.14l1.1-.23-.06-.26-1.1.23A2.44,2.44,0,0,1,87.62,42.14Z"></path><path d="M87.32,40.83l1.09-.27-.06-.26-1.09.27Z"></path><path d="M11.57,50v-.14H10.48v.27h1.09Z"></path><path d="M59.44,12.74l.27-1.07-.26-.07-.27,1.08Z"></path><path d="M58.14,12.44l.23-1.09-.26,0-.23,1.08Z"></path><path d="M76.79,22.46l.79-.81-.2-.18-.78.81Z"></path><path d="M63.29,13.93l.37-1-.25-.09-.37,1Z"></path><path d="M62,13.5l.34-1.06-.25-.08-.35,1.05Z"></path><path d="M64.53,14.42l.42-1-.25-.1-.41,1Z"></path><path d="M54.17,11.8l.11-1.11-.26,0-.12,1.1Z"></path><path d="M56.82,12.18,57,11.09,56.75,11l-.19,1.1Z"></path><path d="M52.83,11.68l.08-1.11-.27,0-.08,1.11Z"></path><path d="M55.5,12l.15-1.1-.26,0-.16,1.1Z"></path><path d="M60.74,13.1,61,12,60.79,12,60.48,13Z"></path><path d="M73.77,19.81l.69-.88-.21-.17-.69.89Z"></path><path d="M72.7,19l.66-.91-.21-.16-.66.91Z"></path><path d="M65.77,15l.45-1-.24-.1-.46,1Z"></path><path d="M75.82,21.54l.75-.83-.2-.18-.75.83Z"></path><path d="M74.81,20.66l.72-.86-.2-.17-.72.85Z"></path><path d="M71.61,18.22l.63-.92L72,17.15l-.62.92Z"></path><path d="M68.17,16.13l.53-1L68.46,15l-.52,1Z"></path><path d="M67,15.52l.49-1-.24-.11-.49,1Z"></path><path d="M70.49,17.49l.59-.95-.23-.14-.59,1Z"></path><path d="M86.08,63.27l1,.38.09-.26-1-.38Z"></path><path d="M11.6,51.21l-1.1,0v.27l1.1,0A2.35,2.35,0,0,1,11.6,51.21Z"></path><path d="M71.39,81.93l.62.92.23-.15-.63-.92Z"></path><path d="M66.74,84.6l.49,1,.24-.12-.49-1Z"></path><path d="M67.94,84l.52,1,.24-.13-.52-1Z"></path><path d="M65.52,85.16l.46,1,.24-.11-.45-1Z"></path><path d="M75.62,78.64l.75.83.2-.18-.74-.83Z"></path><path d="M72.49,81.16l.66.9.21-.16-.65-.9Z"></path><path d="M76.6,77.72l.78.81.2-.19-.78-.8Z"></path><path d="M74.61,79.51l.72.86.2-.17-.72-.86Z"></path><path d="M73.56,80.35l.69.88.21-.16-.69-.88Z"></path><path d="M53.9,88.24,54,89.33l.26,0-.11-1.1Z"></path><path d="M56.56,87.86l.19,1.1.26,0-.19-1.09Z"></path><path d="M55.23,88.07l.16,1.1.26,0L55.5,88Z"></path><path d="M52.56,88.34l.08,1.11.27,0-.08-1.11Z"></path><path d="M57.88,87.62l.23,1.08.26-.06-.23-1.08Z"></path><path d="M77.56,76.78l.8.78.19-.19-.81-.79Z"></path><path d="M60.48,87,60.79,88,61,88l-.3-1.07Z"></path><path d="M61.77,86.59l.34,1,.25-.08L62,86.5Z"></path><path d="M63,86.16l.37,1,.25-.09-.37-1Z"></path><path d="M64.29,85.68l.41,1,.25-.1-.41-1Z"></path><path d="M59.18,87.32l.27,1.07.26-.06-.27-1.07Z"></path><path d="M86.91,60.71,88,61l.08-.25L87,60.46Z"></path><path d="M87.82,56.8l1.11.19,0-.26-1.1-.19C87.85,56.62,87.84,56.71,87.82,56.8Z"></path><path d="M87.57,58.12l1.09.23.06-.26-1.09-.23A2,2,0,0,0,87.57,58.12Z"></path><path d="M88,55.48l1.11.15,0-.26-1.12-.16Z"></path><path d="M51.22,88.4l0,1.11h.27l0-1.11Z"></path><path d="M87.26,59.42l1.09.27.06-.26-1.09-.27A2,2,0,0,1,87.26,59.42Z"></path><path d="M88.32,52.81l1.13.08,0-.27-1.13-.08A2.45,2.45,0,0,0,88.32,52.81Z"></path><path d="M88.39,51.47l1.13,0v-.27l-1.13,0A2.35,2.35,0,0,1,88.39,51.47Z"></path><path d="M86.51,62l1.07.34.08-.25-1.06-.35Z"></path><path d="M78.48,75.8l.83.75.18-.2-.84-.75C78.59,75.67,78.54,75.74,78.48,75.8Z"></path><path d="M88.21,54.15l1.11.11,0-.26-1.11-.12Z"></path><path d="M81,72.69l.9.65.16-.21-.91-.66Z"></path><path d="M81.79,71.59l.93.63.15-.22-.93-.63Z"></path><path d="M79.36,74.79l.86.72.17-.2-.86-.72C79.47,74.66,79.41,74.72,79.36,74.79Z"></path><path d="M82.52,70.47l1,.59.15-.22-1-.6Z"></path><path d="M80.2,73.75l.89.69.16-.21-.88-.69Z"></path><path d="M85.59,64.51l1,.42.1-.25-1-.42Z"></path><path d="M85.06,65.74l1,.46.11-.24-1-.46A2.56,2.56,0,0,0,85.06,65.74Z"></path><path d="M84.49,67l1,.49.12-.24-1-.49Z"></path><path d="M83.88,68.15l1,.53.13-.24-1-.52Z"></path><path d="M70.26,82.65l.59.95.23-.14-.59-.95Z"></path><path d="M16.66,69.1l-.95.55.13.23.95-.54Z"></path><path d="M17.34,70.26l-.92.58.14.22.93-.58Z"></path><path d="M18.07,71.39l-.9.61.15.22.9-.61Z"></path><path d="M15.4,66.74l-1,.47.12.24,1-.48A2.53,2.53,0,0,1,15.4,66.74Z"></path><path d="M16,67.93l-1,.51.12.24,1-.51Z"></path><path d="M19.65,73.56l-.87.67.16.21.87-.67Z"></path><path d="M21.36,75.62l-.81.73.18.2.81-.73Z"></path><path d="M22.28,76.6l-.8.77.19.19.79-.77Z"></path><path d="M20.48,74.61l-.83.7.17.2.84-.7Z"></path><path d="M14.84,65.51l-1,.45.1.24,1-.44C14.91,65.68,14.88,65.6,14.84,65.51Z"></path><path d="M18.84,72.48l-.89.65.16.21L19,72.7A1.77,1.77,0,0,1,18.84,72.48Z"></path><path d="M23.22,77.55l-.76.79.19.19.76-.79Z"></path><path d="M14.32,64.28l-1,.4.1.25,1-.4Z"></path><path d="M12.13,56.54l-1.07.19,0,.26,1.07-.19C12.17,56.72,12.15,56.63,12.13,56.54Z"></path><path d="M11.66,52.55l-1.09.07,0,.27,1.09-.08A2.28,2.28,0,0,0,11.66,52.55Z"></path><path d="M11.76,53.88,10.68,54l0,.26,1.08-.11A2.48,2.48,0,0,0,11.76,53.88Z"></path><path d="M12.38,57.86l-1.06.23,0,.26,1.07-.23A2,2,0,0,1,12.38,57.86Z"></path><path d="M11.93,55.22l-1.08.15,0,.26L12,55.48Z"></path><path d="M13.84,63l-1,.37.09.26,1-.37Z"></path><path d="M13.41,61.75l-1,.34.08.25,1-.33A2.58,2.58,0,0,1,13.41,61.75Z"></path><path d="M12.68,59.17l-1.06.26.07.26,1.05-.26Z"></path><path d="M13,60.47l-1,.3.07.25,1-.3C13.07,60.64,13.05,60.55,13,60.47Z"></path><path d="M43.21,87.82,43,88.91l.26,0,.19-1.09Z"></path><path d="M40.59,87.27l-.27,1.06.26.06.27-1.06Z"></path><path d="M41.89,87.57l-.22,1.07.26.06.22-1.07Z"></path><path d="M39.29,86.91,39,88l.26.07.3-1.06Z"></path><path d="M38,86.51l-.34,1,.26.08.33-1Z"></path><path d="M44.54,88l-.16,1.09.27,0,.15-1.1Z"></path><path d="M36.74,86.08l-.37,1,.25.09.37-1Z"></path><path d="M48.54,88.39l0,1.11h.27l0-1.11Z"></path><path d="M47.2,88.32l-.07,1.11.26,0,.08-1.11Z"></path><path d="M45.87,88.21l-.12,1.09.27,0,.11-1.09Z"></path><path d="M26.25,80.2l-.68.87.21.16.68-.86Z"></path><path d="M27.32,81l-.65.88.22.16.64-.89Z"></path><path d="M28.41,81.79l-.61.91.22.15.61-.91Z"></path><path d="M25.21,79.36l-.71.84.21.17.7-.84Z"></path><path d="M24.19,78.48l-.73.81.2.18.74-.82Z"></path><path d="M29.53,82.52l-.58.94.23.14.58-.93Z"></path><path d="M31.85,83.88l-.51,1,.23.13.52-1Z"></path><path d="M30.68,83.22l-.55,1,.23.13.55-1Z"></path><path d="M34.26,85.06l-.45,1,.25.11.44-1Z"></path><path d="M33,84.49l-.47,1,.24.12.47-1Z"></path><path d="M35.49,85.59l-.41,1,.25.1.41-1Z"></path></g><g id="big"><path d="M30.87,16.68l-1.64-2.83-.46.27,1.63,2.82Z"></path><path d="M11.58,50.27a3.65,3.65,0,0,1,0-.54H8.21a3.65,3.65,0,0,1,0,.54Z"></path><path d="M16.73,30.76,13.85,29.1l-.27.46,2.89,1.67Z"></path><path d="M83.2,30.64c.09.16.18.31.26.47l2.87-1.66a1.09,1.09,0,0,1-.14-.23,1,1,0,0,1-.13-.23Z"></path><path d="M50,11.57h.27V8.33h-.54v3.25Z"></path><path d="M69.48,16.87l1.62-2.8a2.07,2.07,0,0,1-.25-.15.88.88,0,0,1-.21-.12L69,16.61Z"></path><path d="M30.59,83.16l-1.75,3,.47.26,1.74-3Z"></path><path d="M88.42,49.73a3.65,3.65,0,0,1,0,.54h3.37v-.54Z"></path><path d="M83.29,69.19l-.26.46L86,71.35a1.12,1.12,0,0,1,.13-.24,1,1,0,0,1,.14-.22Z"></path><path d="M50,88.43h-.27v3.49h.54V88.42Z"></path><path d="M16.64,69.07l-3,1.71.27.47,3-1.72C16.81,69.38,16.73,69.22,16.64,69.07Z"></path><path d="M68.83,83.5l1.73,3,.25-.16a1.12,1.12,0,0,1,.22-.1l-1.74-3Z"></path></g><text class="text3" transform="translate(48.51 6.48)">0</text><text class="text3" transform="translate(54.06 93.52) rotate(180)"><tspan class="text3">1</tspan><tspan class="text3" x="2.19" y="0">8</tspan><tspan x="5.13" y="0">0</tspan></text><text class="text3" transform="translate(6.48 52.97) rotate(-90)"><tspan class="text3">9</tspan><tspan x="2.95" y="0">0</tspan></text><text class="text3" transform="translate(93.52 47.03) rotate(90)"><tspan class="text3">9</tspan><tspan x="2.95" y="0">0</tspan></text><text class="text3" transform="translate(14.33 75.26) rotate(-120)"><tspan class="text3">1</tspan><tspan class="text3" x="2.21" y="0">2</tspan><tspan x="5.08" y="0">0</tspan></text><text class="text3" transform="translate(86.19 25.64) rotate(60)"><tspan class="text3">6</tspan><tspan x="3.01" y="0">0</tspan></text><text class="text3" transform="translate(31.74 89.71) rotate(-150)">1<tspan class="text3" x="2.2" y="0">5</tspan><tspan class="text3" x="5.1" y="0">0</tspan></text><text class="text3" transform="translate(69.22 10.85) rotate(30)">3<tspan class="text3" x="2.86" y="0">0</tspan></text><text class="text3" transform="translate(75.26 85.66) rotate(150)">1<tspan class="text3" x="2.2" y="0">5</tspan><tspan class="text3" x="5.1" y="0">0</tspan></text><text class="text3" transform="translate(25.71 13.78) rotate(-30)">3<tspan class="text3" x="2.86" y="0">0</tspan></text><text class="text3" transform="translate(89.71 68.26) rotate(120)"><tspan class="text3">1</tspan><tspan class="text3" x="2.21" y="0">2</tspan><tspan x="5.08" y="0">0</tspan></text><text class="text3" transform="translate(10.81 30.84) rotate(-60)"><tspan class="text3">6</tspan><tspan x="3.01" y="0">0</tspan></text></g></svg>
            </i>
        </div>
        <i class="ui icon-size-230 color-fill-type-primary wind-gauge-dir">
            <svg class="ui icon rotate-anim" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="rotate_12021" :style="'transform:rotate(' + valueToShow + 'deg)'"><g id="sog-cog-dir"><g id="arrow"><path style="display:none;" d="M50,80.49a30.17,30.17,0,0,1-6.83-.78L50,86.54l6.83-6.83A30.17,30.17,0,0,1,50,80.49Z"></path><path d="M50,19.51a30.17,30.17,0,0,1,6.83.78L50,13.46l-6.83,6.83A30.17,30.17,0,0,1,50,19.51Z"></path></g></g></svg>
        </i>
        <div class="sog-cog-info">
            <h5 class="ui h5 font-regular mg-med align-center color-text-type-secondary-light">WIND</h5>
            <h3 class="ui h3 font-bold align-center color-text-type-success glow"><span> {{value2ToShow}} </span> kn</h3>
        </div>
        <span style="display: none"> {{value}} </span>
        <span style="display: none"> {{value2}} </span>
        <span style="display: none"> {{valueRewindMode}} </span>
        <span style="display: none"> {{valueRewindMode2}} </span>
    </div>
</div>
    `,
    data() {
        return {
            value:null,
            value2:null,
            valueToShow: null,
            value2ToShow: null,
            valueRewindMode: null, 
            valueRewindMode2: null, 
            rewindMode : rewindValuesMode,
            globalRewind : globalRewindUpdate
        }
    },
    created() {
        eventBus.subscribe('rewindValuesModeChanged', (newVal) => {
          this.rewindMode = newVal;
        });
        eventBus.subscribe('globalRewindUpdateChanged', (newVal) => {
           this.globalRewind = newVal;
        });

      },
    watch: {
        rewindMode(newVal, oldVal) {
            this.rewindCheck()
        },
        globalRewind(newVal, oldVal) {
            this.rewindCheck()
        },
    },
    mounted() {
        switch (this.valueMode) {
            case "filtered":
                this.value = valueFiltered[this.signalIdOptionOne];
                this.value2 = valueFiltered[this.signalIdOptionTwo];
                break;
            case "escalated":
                this.value = valueEscalated[this.signalIdOptionOne];
                this.value2 = valueFiltered[this.signalIdOptionTwo];
                break;
            default:
            case "raw":
                this.value = valueRaw[this.signalIdOptionOne];
                this.value2 = valueFiltered[this.signalIdOptionTwo];
                break;
        }

        if (typeof this.valueDecimals === 'undefined') {
            this.decimals = 0
        } else {
            this.decimals = this.valueDecimals
        }

        this.rewindCheck()

        // Observer for push id to global array
        const trueWindElement = this.$refs.trueWindElement;
        if (trueWindElement) {
            let observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!visibleHistoricalValue.includes(this.signalIdOptionOne)) {
                            visibleHistoricalValue.push(this.signalIdOptionOne);
                        }
                        if (!visibleHistoricalValue.includes(this.signalIdOptionTwo)) {
                            visibleHistoricalValue.push(this.signalIdOptionTwo);
                        }
                    } else {
                        const index = visibleHistoricalValue.indexOf(this.signalIdOptionOne);
                        if (index > -1) {
                            visibleHistoricalValue.splice(index, 1);
                        }
                        const index2 = visibleHistoricalValue.indexOf(this.signalIdOptionTwo);
                        if (index2 > -1) {
                            visibleHistoricalValue.splice(index2, 1);
                        }
                    }
                });
            });
            observer.observe(trueWindElement);
        } else {
            console.error('Ref element is not available.');
        }

    },
    updated(){

        this.rewindCheck()
  
    },
    methods:{
        rewindCheck(){
            if (!this.rewindMode == true) {
                if (!isNaN(this.value)) {
                    this.valueToShow = parseFloat(this.value).toFixed(this.decimals)
                }
                if (!isNaN(this.value2)) {
                    this.value2ToShow = parseFloat(this.value2).toFixed(this.decimals)
                }
            }
            else{

                if(visibleHistoricalValue.includes(this.signalIdOptionOne)){
                setTimeout(() => {
                    if (this.signalIdOptionOne in valueHistorical) {
                        this.valueToShow = parseFloat(valueHistorical[this.signalIdOptionOne][0].Value).toFixed(this.decimals)
                    } else {
                        this.valueToShow = null
                    }
                }, 500);    
                }else{
                    return;
                }

                if(visibleHistoricalValue.includes(this.signalIdOptionTwo)){
                    setTimeout(() => {
                        if (this.signalIdOptionTwo in valueHistorical) {
                            this.value2ToShow = parseFloat(valueHistorical[this.signalIdOptionTwo][0].Value).toFixed(this.decimals)
                        } else {
                            this.value2ToShow = null
                        }
                    }, 500);    
                    }else{
                        return;
                    }
            }
        }
    }

};







