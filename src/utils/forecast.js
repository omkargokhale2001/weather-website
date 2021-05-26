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
            region=response.body.location.name
            temp=response.body.current.temperature
            feels_temp=response.body.current.feelslike
            descrip=response.body.current.weather_descriptions
            country = response.body.location.country
            pressure = response.body.current.pressure
            humidity = response.body.current.humidity
            is_day = response.body.current.is_day
            if(is_day==="no"){
                day_night = "Night"
            }
            else{
                day_night = "Day"
            }

            const data = {
                line1:"Location:"+region+", "+country,
                line2:"Temperature: "+String(temp)+"(Feels like "+String(feels_temp)+")",
                line3:"Pressure:"+pressure+"\nHumidity:"+humidity,
                line4:day_night+" time..",
            }
                callback(undefined,data)
        }   
        })
}

module.exports=forecast