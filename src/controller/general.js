const generalModel = require("../model/general");
const createError = require('http-errors')

const isciGetir = async(req,res) =>{
   try{
    const data = await generalModel.isciGetir();
    

    if(data.length > 0){
        res.json({
            data: data,
            success : true
        });
    }else{
        res.json({
            data: [],
            success : true
        });
    }

   }catch(err){
        res.json({
            data: err,
            success : false
        });
   }
  
}

const isciGetirEmail = async(req,res) =>{

    try{
 
        
     const data = await generalModel.mailGetir(req.query.email);
     
 
     if(data.length > 0){
         res.json({
             data: data,
             success : true
         });
     }else{
         res.json({
             data: [],
             success : true
         });
     }
 
    }catch(err){
         res.json({
             data: err,
             success : false
         });
    }
   
 }

 const isciSil = async(req,res,next) =>{

    try{
 
        
     const data = await generalModel.isciSil(req.query.id);
     
        
     if(data==1){
         res.json({
             data: `${req.query.id} id-li informasiya silindi!`,
             success : true
         });
     }else{

        //return next(createError(404, 'Daxil edilən ID yanlışdır və ya gözlənilməyən bir xəta baş verdi!.'))

         res.status(404).json({
             data: [],
             success : true
         });
     }
 
    }catch(err){
         res.json({
             data: err,
             success : false
         });
    }
   
 }

 const isciElave = async(req,res) =>{

    try{
 
     const {namelastname,position,salary,family,email} = req.query;
        
     const data = await generalModel.isciElaveEt(namelastname,position,salary,family,email);
     
        
     if(data==1){
         res.json({
             data: `Success Insert`,
             success : true
         });
     }else{
         res.json({
             data: [],
             success : true
         });
     }
 
    }catch(err){
         res.json({
             data: err,
             success : false
         });
    }
   
 }

 const isciRedakte = async(req,res) =>{

    try{
     const {id,namelastname,position,salary,family} = req.query;
        
     const data = await generalModel.isciRedakteEt(id,namelastname,position,salary,family);
     
        
     if(data==1){
         res.json({
             data: `Success Update`,
             success : true
         });
     }else{
         res.json({
             data: [],
             success : true
         });
     }
 
    }catch(err){
         res.json({
             data: err,
             success : false
         });
    }
   
 }

 const login = async(req,res) =>{
    try{
        console.log(req.query);
     const data = await generalModel.login(req.query.email,req.query.password);

     if(data){
         res.json({
             data: data,
             success : true
         });
     }else{
         res.json({
             data: 'Nc NC',
             success : true
         });
     }
 
    }catch(err){
         res.json({
             data: err,
             success : false
         });
    }
   
 }

 const myData = async(req,res,next) =>{
    try{
     if(req.user){
         res.json({
             data: req.user,
             status : true
         });
     }else{
         res.json({
             data: 'Nc NC',
             status : false
         });
     }
 
    }catch(err){
        next()
    }
   
 }

module.exports  = {
    isciGetir,
    isciGetirEmail,
    isciSil,
    isciElave,
    isciRedakte,
    login,
    myData
}