/**
 * Created by WHH on 2017-10-10.
 */
export function backOrClose() {
    if(window.history.length > 1){
        window.history.back();
    }else{
        if(typeof YYPlugin != 'undefined'){
            window.YYPlugin.call("CommonPlugin", "closewindow");
        }else{
            console.log('无回退，且未加载YYPlus！')
        }
    }
}
