export default class DateTime {
    constructor(timestamp){
        this.date = new Date(timestamp)
    }

    format(){

        if(!+this.date){
            return '00:00'
        }

        let hours = this.date.getHours()
        let minutes = this.date.getMinutes()

        if(hours < 10){
            hours = `0${hours}`
        }

        if(minutes < 10){
            minutes = `0${minutes}`
        }

        return `${hours}:${minutes}`
    }
}