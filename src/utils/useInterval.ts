import { onMounted, onUnmounted } from "vue";

export const useInterval = (callback: Function, time : number = 1000) => {
    let timer: ReturnType<typeof setInterval> | null = null;

    function start(){
        if(timer !== null)
            stop()
        timer = setInterval(callback,time);
    }
    function stop(){
        if(timer !== null){
            clearInterval(timer);
            timer= null;
        }
    }

    onMounted(start)
    onUnmounted(stop)

    return [start,stop]
}