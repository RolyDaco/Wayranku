const fs = require('fs');
const express = require('express');


const { request, response } = require('express');
require('dotenv').config();

const axios = require('axios');


const lugar = async(req = request, res = response) => {  
     //res.render("index", {titulo : "mi titulo dinamico"});
      
     const {Airquality} = req.body;
     
     if (!Airquality) return res.redirect("/");
     
         try{

          const instance = axios.create({
               baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${Airquality}.json`,
               params: {
                    'access_token': process.env.MAPBOX_KEY,
                    'proximity': 'ip',
                    'limit': 1,
                    'language': 'es'     
               }
          });
          
          const resp = await instance.get('/', (req, res));
          const one = resp.data.features.map(Airquality=>Airquality.place_name);
          
          
          

          const inst = axios.create({
               baseURL: `https://api.openweathermap.org/data/2.5/weather`,
               params: {
               appid: process.env.OPENWEATHER_KEY,
               units: 'metric',
               lang: 'es', 
               lon: Number(resp.data.features.map(Airquality=>Airquality.center[0])),            
               lat: Number(resp.data.features.map(Airquality=>Airquality.center[1]))
               }
          });
               
          const respt = await inst.get('/', (req, res))
               const { weather, main } = respt.data 
             

               // instance axios.create()
        
          
          const instan = axios.create({
               baseURL: `http://api.airvisual.com/v2/nearest_city`,
               params: {
                    key: process.env.AIRVISUAL_KEY,
                         
                    lon: Number(resp.data.features.map(Airquality=>Airquality.center[0])),  
                    lat: Number(resp.data.features.map(Airquality=>Airquality.center[1]))
               }                
          })

          const resp2 = await instan.get('/', (req, res));
          const { data } = resp2.data;
          let saludable = data.current.pollution.aqius;



          //res.redirect('/');
                
          if (saludable <= 50) {
               result = '🟢 El Aire es SALUDABLE para Todos😀';
          }
          else if (51 <= saludable && saludable <= 100) {
               result = '🟡 La calidad de Aire es MODERADO 🤧';
          }
          else if (101 <= saludable && saludable <= 150) {
               result = '¡🟠 El Aire es INSALUBRE para grupos sencibles! 🩺👶👴';
          }
          else if (151 <= saludable && saludable <= 200) {
               result = '¡🔴El Aire es INSALUBRE para todos! 😷✋';
          }
          else if (201 <= saludable && saludable <= 300) {
               result = '🟣¡El Aire es muy INSALUBRE para todos! 💊👨‍⚕️';
          }
          else if (301 <= saludable && saludable <= 1000) {
               result = '¡El Aire es PELIGROSO para TODOS! 🆘';
          }
  
          //  res.render("index", {
          //       arrayLugar: [
          //           {ciudad: `📍${one}`, 
          //            clima: `🌤El clima esta con: ${respt.data.weather[0].description}`, 
          //            temperatura: `🌡La temperatura es de: ${respt.data.main.temp} °C`, 
          //            humedad: `🌫La humedad es de: ${respt.data.main.humidity} %`, 
          //            ica: `📢El Índice de Calidad del Aire (ICA) es de: ${data.current.pollution.aqius}`, 
          //            particulas: `🔎La cantidad de partículas suspendidas en el aire (PM2.5) es de: ${Number((data.current.pollution.aqius)/2.92).toFixed(2)} μg/m3`, 
          //            descr: `${result}`},
          //       ]
          //  });

          
          ("/", res.json({
     
                    ciudad: `📍${one}`, 
                    clima: `🌤El clima esta con: ${respt.data.weather[0].description}`, 
                    temperatura: `🌡La temperatura es de: ${respt.data.main.temp} °C`, 
                    humedad: `🌫La humedad es de: ${respt.data.main.humidity} %`, 
                    ica: `📢El Índice de Calidad del Aire (ICA) es de: ${data.current.pollution.aqius}`, 
                    partículas: `🔎La cantidad de partículas suspendidas en el aire (PM2.5) es de: ${Number((data.current.pollution.aqius)/2.92).toFixed(2)} μg/m³`, 
                    descr: `${result}`,
               
          }));
       

     } catch (error) {
          console.log(error)
     
     }
}


const climas = async(req = require, res = response) => {

      res.render("index", {
         arrayLugar: [
              {ciudad: 'Ciudad: one', clima: 'Clima: nuboso', temperatura: '17°C', humedad: 
              "90%", ica: "90", partículas: "PM2.5", descr: "Aire Bueno" },
            
          ]
     });
 
 }

 module.exports = {
     lugar,
     climas
 }
