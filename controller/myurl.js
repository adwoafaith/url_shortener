const express = require('express')
const shortid = require('shortid')
const Url = require('../model/url')
require('dotenv').config()
const port = process.env.PORT 

const homePage = (req,res) =>{
    try {
       res.status(200).send("Welcome to Url shortener") 
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const saveUrl = async(req, res) =>{
  try {
    const {originalUrl} = req.body;
       //check if the url is valid
    if (!isValidUrl(originalUrl)){
        return res.status(400).json({error:"Invalid Url"});
    }

    //check if the url is already in the database
    const existingUrl = await Url.findOne({originalUrl})
    if (existingUrl){
        return res.json(existingUrl);
    }

    //generate a shot url
    const shortUrl = `http://localhost:${port}/${shortid.generate()}`

    //save to the database
    const urlEntry = new Url({originalUrl, shortUrl})
    await urlEntry.save();
    res.json(urlEntry)
  } catch (error) {
    res.send(error.message)
  }
}

const findUrl = async(req,res) =>{
    const {shortUrl} = req.body;

    //find the original url based on the short url
    const urlEntry = await Url.findOne({shortUrl});
    if (urlEntry){
        res.redirect(urlEntry.originalUrl);
        
    }   
    else{
        res.status(404).send('Not Found');
    }
}

function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

 module.exports = {
    homePage,
    saveUrl,
    findUrl
 } 