const express = require('express')
const { default: mongoose } = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
})

const UrlModel = mongoose.model('Url',urlSchema)
module.exports = UrlModel;