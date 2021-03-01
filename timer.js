 //TODO : parametres de boutons reset, pause, start, style responsive , test d'intégration
 class Timer{
   
    constructor(parent , parameters = null){
        this.parent = parent
        this.parameters = parameters
        this.pair = true
        this.tableCreated = false
        this.buttons = false
        this.isRunning = false
        this.value = 0
        this.init()
    }
    init(){
       
        if(this.parent != null){
            this.timer = document.createElement('p')
            this.parent.appendChild(this.timer)
            this.setTime()
            this.createButtons()
            if(this.btnPause && this.btnReset  && this.btnStart  && this.btnLap){
                this.buttons = true
                this.btnPause.disabled = true
                this.btnReset.disabled = true
                this.btnLap.disabled = true
            }
            this.createTable()
            this.style()
        }
        else{
            console.log('Parent element is null of not referenced')
        }
        
    }     
    style(){
        if(this.parent){
            this.parent.style.display = "flex"
            this.parent.style.flexDirection = "column"
            this.parent.style.width = "10%"
            this.parent.style.height = "auto"
            this.parent.style.justifyContent  = "space-between"
            this.parent.style.alignItems = "center"
            this.parent.style.border = "0.5px solid #999999"
            this.parent.style.borderRadius = "3px"
            this.parent.style.margin = "2%"
        }
        if(this.timer){
            this.timer.style.fontSize = "100%"
            this.timer.style.width = "25%" 
            
            this.timer.style.padding = "2%"
            this.timer.style.border = "1px solid #CCCCCC"
        }
        if(this.table){
            this.table.cellSpacing = "0"
            this.table.style.padding = "0"
            this.table.style.margin = "5%"
            this.table.style.height = "auto"
            this.table.style.width ="auto"
            
        }

        if(this.buttons === true){
            let styleButton = document.querySelectorAll('.btn')
            let btngrpstyle =  document.querySelector('.btngrp')
            btngrpstyle.style.width = "70%"
            btngrpstyle.style.display = "flex"
            btngrpstyle.style.justifyContent ="space-between"
            if(styleButton){
                styleButton.forEach(elm => {
                    elm.style.fontSize = "50%"
                    elm.style.margin = "2%"
                    elm.style.padding = "2%"
                    elm.style.border = "none"
                    elm.style.backgroundColor = "#EEEEEE"
                    elm.style.borderBottom = ".15em solid #999999"
                    elm.style.borderRadius = "5%"
                });
            }
            
        }

        
    }
    createTable(){
        if(this.tableCreated === false){
            this.lapId = 1;
            this.table = document.createElement('table')
            this.thead = document.createElement('thead')
            this.tbody = document.createElement('tbody')
            this.theadtr = document.createElement('tr')
            this.thead.style.padding = "0"
            this.thead.style.backgroundColor = "#a8dadc"
            
            this.theadth = document.createElement('th')
            this.theadthid = document.createElement('th')
            this.theadthid.style.borderRight = "1px solid white"
            this.theadthid.innerHTML = "#"
            this.theadth.innerHTML = "lap"
            this.theadtr.appendChild(this.theadthid)
            this.theadtr.appendChild(this.theadth)
            this.thead.appendChild(this.theadtr)
            this.table.appendChild(this.thead)
            this.table.appendChild(this.tbody)
            this.parent.appendChild(this.table)
            this.tableCreated = true
        }
        
    }
    pause(){
        if(this.isRunning && this.btnPause && this.btnStart){
            this.isRunning = false
            clearInterval(this.chrono)
            this.btnPause.disabled = true
            this.btnStart.disabled = false
            if(this.btnReset){
                this.btnReset.disabled = false
            }
        }     
    }       
    start(){
        
        if (this.isRunning === false && this.btnStart) {
            this.isRunning = true;
            this.chrono = setInterval(() => {
            this.value += 1;
            if(this.value > 0.01){
                this.btnLap.disabled = false
                this.btnReset.disabled = false
            }
            this.setTime(this.value)
            },1000);

            if(this.btnPause && this.btnStart){
                this.btnPause.disabled = false
                this.btnStart.disabled = true
            }

            
        }
    }
    lap(){
        if(this.btnLap != null && this.table){
            this.tr = document.createElement('tr')
            this.tr.style.marging = "0"
            this.td = document.createElement('td')
            this.tdId = document.createElement('td')
            this.tdId.innerHTML = this.lapId
            
            this.td.innerHTML = this.setTime()
            this.tr.appendChild(this.tdId)
            this.tr.appendChild(this.td)
            this.tbody.appendChild(this.tr)
            this.lapId += 1    
            this.btnReset.disabled = false

            if(this.pair === true){
                this.tr.style.backgroundColor = "#EEEEEE"
                this.pair = false
            }
            else{
                this.tr.style.backgroundColor = "white"
                this.pair = true
            }
            this.tdId.style.padding = "5%"
            this.tdId.style.borderRight = "1px solid white"
        }
       
    }
    createButtons(){
        if(this.buttons === false){
        this.btnStart = document.createElement('button')
        this.btnPause = document.createElement('button')
        this.btnReset = document.createElement('button')
        this.btnLap = document.createElement('button')
        this.btnStart.classList.add('btn')
        this.btnPause.classList.add('btn')
        this.btnLap.classList.add('btn')
        this.btnReset.classList.add('btn')

        let btngrp = document.createElement('div')
        btngrp.classList.add('btngrp')
        if(this.btnPause  && this.btnReset  && this.btnStart  && this.btnLap){
            this.btnStart.innerHTML = "Start"
            
            this.btnStart.addEventListener('click', function(){
            timer.start()
            })
            this.btnPause.innerHTML = "Pause"
            this.btnPause.addEventListener('click', function(){
                timer.pause()
            })
            this.btnLap.innerHTML = "Lap"
            this.btnLap.addEventListener('click', function(){
                timer.lap()
            })
            this.btnReset.innerHTML = "Reset"
            this.btnReset.addEventListener('click', function(){
                timer.reset()
            })

            btngrp.appendChild(this.btnStart)
            btngrp.appendChild(this.btnPause)
            btngrp.appendChild(this.btnReset)
            btngrp.appendChild(this.btnLap)
            this.parent.appendChild(btngrp)
            this.buttonsCreated = true
            }
        }
       
    }
    setTime(val = null){
        let heure = Math.floor(this.value /  60 / 60);
        let minute = Math.floor(this.value / 60);
        let seconde = this.value
    
        if(heure >= 1){
            
            seconde -= 60 * minute
            minute -= 60 * heure
            this.timer.innerText = heure + ":"+ minute +":"+ seconde
            return heure + ":"+ minute+":"+ seconde
        }
        if(minute >= 1 && heure < 1){
            seconde -= 60 * minute
            this.timer.innerText = "0:"+ minute+":"+seconde
            return  "0:"+ minute+":"+seconde
        }
        if(seconde >= 0 && minute < 1 && heure < 1){
            this.timer.innerText = "0:0:"+seconde
            return "0:0:"+seconde
        }
        
    }       
    reset(){
        if(this.btnReset){
            this.value = 0
            this.setTime()
            if(this.table && this.tbody){
                this.tbody.innerHTML = ""
            }
            this.btnReset.disabled = true
        }
       
    }

    
}
