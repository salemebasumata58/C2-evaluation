const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb://127.0.0.1:27017/web-15-411"
  );
};

// USER SCHEMA
// Step 1 :- creating the schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: {type: String, required: true },
    lastName: { type: String, required: true },
    age: {type: Number, required:true},
    email: { type: String, required: true, unique: true },
    address: { type: String, required: false },
    gender: {type: String, required:false},
    type: { type: String, required: false },
   

  },

  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }
);

// Step 2 : creating the model
const User = mongoose.model("user", userSchema); // user => users

// POST SCHEMA
// Step 1 :- creating the schema
const branchScheme = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    IFSC:{type:String,required:true},
    MICR: {type: Number, required:true},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }
);

// Step 2 :- creating the model
const Branch = mongoose.model("branch", branchScheme); // post => posts


// Step 1 :- creating the schema
const MasterSchema = new mongoose.Schema(
  {
    balance:{type: String,required:true},
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch",
        required: true,
      },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Master = mongoose.model("master", MasterSchema); 

const savingsSchema = new mongoose.Schema(
    {
      account_number:{type:Number, required:true},

      balance:{type: String,required:true},
      interestRate:{type:Number, required:true},
    //   postId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "post",
    //     required: true,
    //   },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      masterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "master",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

// Step 2 :- creating the model
const Saving = mongoose.model("saving", savingsSchema); 


const fixedSchema = new mongoose.Schema(
    {
        account_number:{type:Number, required:true},

      balance:{type: String,required:true},
      interestRate:{type:Number, required:true},
      startDate:{type:String, required:true},
      maturityDate :{type:String, required:true},
    //   postId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "post",
    //     required: true,
    //   },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      masterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "master",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

// Step 2 :- creating the model
const Fixed = mongoose.model("fixed", fixedSchema); 

app.get("/users",async (req,res) =>{
    try{
       const users= await User.find().lean().exec();
       return res.status(200).send({users : users});

    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});



app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


// app.post("/users", async (req, res) => {
//     try {
//       const user = await Fixed.create(req.body);
  
//       return res.status(201).send(user);
//     } catch (err) {
//       return res.status(500).send({ message: err.message });
//     }
//   });


app.listen(5002, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }

  console.log("listening on port 5002");
});
