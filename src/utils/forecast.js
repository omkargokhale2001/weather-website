const request=require('request')

const forecast=(long,lat,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=abbf5dcf1c647ba4117dd2f687465cf7&query="+lat+","+long+"&units=f"
    request({url,json:true},(error,response)=>{
        if(error){
            callback("Connect to interwebs fool!")
        }
        else if(response.body.error){
            callback("Enter correct coordinates lol!")
        }
        else{
            data0=response.body.location.name
            data1=response.body.current.temperature
            data2=response.body.current.feelslike
            data3=response.body.current.weather_descriptions

            const data=data3+"."+"The temperature is "+String(data1)+".But it feels like it is "+String(data2)+"."
            callback(undefined,data)
        }   
        })
}

module.exports=forecast