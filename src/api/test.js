import myaxios from "@/utils/myaxios";

export default{
    getList(){
        const promise1 = myaxios({
            method:'get',
            url:'/api/data.json'
        })
        return promise1
    }
}
