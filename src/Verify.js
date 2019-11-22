export function Verify (i,time){
//   return 1
    let t1,t2,t3,t4,t;
    if(time.length==4)  time='0'+time;
    console.log("time",time);
    t=i.availabletime;
    t=t.split(',')
    t1=t[0].split('-')
    t2=t1[1];   t1=t1[0];

    if(t1.length==4)  t1='0'+t1;
    if(t2.length==4)  t2='0'+t2;
    console.log(t1,t2)

    t3=t[1].split('-')
    t4=t3[1];   t3=t3[0];
    if(t3.length==4)  t3='0'+t3;
    if(t4.length==4)  t4='0'+t4;
    console.log(t3,t4)

    return (t1<=time && time<=t2) || (t3<=time && time<=t4) ;
}
export function getTime(){
    let time=new Date();
    time=time.getHours()+':'+time.getMinutes();
    time=time.toString();
    return time
}
//   export default Verify;