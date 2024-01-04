const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

async function getUsers() {
    const users = await prisma.Users.findMany()
    return NextResponse.json(users, {status: 200})
}

async function postUser(user) {
    const { username, password } = user;
    const newUser = await prisma.users.create({
        data: {
            username,
            password
        }
    })
    return NextResponse.json({newUser}, {status: 201})
}

async function loginUser(loginData){
    if(!loginData.password || !loginData.username){
        return NextResponse.json('Missing Data', {status: 400})
    }

    if(!isNaN(parseInt(loginData.password)) || !isNaN(parseInt(loginData.username))){
        return NextResponse.json('Incorrect Data Type', {status: 400})
    }

    const users = await prisma.users.findUnique({
        where: {
            username: loginData.username
        }
    })
    if(!users){
        return NextResponse.json('Incorrect Username', {status: 404})
    }

    if(loginData.password !== users.password){
        return NextResponse.json('Incorrect Password', {status: 404})
    }

    return NextResponse.json(users, {status: 200})
    
}

async function fetchUserByUsername (username) {
    if(!isNaN(parseInt(username))){
        return NextResponse.json('Incorrect Data Type', {status: 400}) 
    }

    const users = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    if(!users){
        return NextResponse.json('No users found', {status: 404})
    }

    return NextResponse.json(users, {status: 200})
}

module.exports = {getUsers, postUser, loginUser, fetchUserByUsername}