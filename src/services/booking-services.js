const axios = require('axios');
const {BookingRepository} = require('../repositories');
const {ServerConfig} = require('../config');
const db = require('../models');
const { StatusCodes } = require('http-status-codes');
const AppError=require('../utils/errors/app-error');
async function createBooking(data) {
    return new Promise((resolve,reject)=>{
      
            const result=db.sequelize.transaction(async function bookingImpl(t) {
                console.log(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
                const flight=await axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);
                if(data.noofSeats>flight.data.data.totalSeats){
                    reject(new AppError("required no of seats not available",StatusCodes.INTERNAL_SERVER_ERROR));
                }
               resolve(true);
                
            });
    })
   
    
}
module.exports={
    createBooking
}