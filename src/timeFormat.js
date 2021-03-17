export default function () {
    function timestamp2Date(timestamp){
        const dateObj = new Date(timestamp * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = dateObj.getFullYear();
        const month = months[dateObj.getMonth()];
        const date = dateObj.getDate();
        const hour = dateObj.getHours();
        const min = dateObj.getMinutes();
        return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    }

    return {
        timestamp2Date,
    }
}