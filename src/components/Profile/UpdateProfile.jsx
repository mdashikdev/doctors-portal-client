import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { AllContext, MainApi } from '../../App';
import { GoCloudUpload } from 'react-icons/go';
import { ClapSpinner } from "react-spinners-kit";
import WantTo from './WantTo';

function UpdateProfile() {
  const contexts = useContext(AllContext);
  const [loading, setloading] = useState(false);

  const {handleSubmit,handleChange,handleBlur,values} = useFormik({
      initialValues: {
        name : contexts.currentUser.name,
        email : contexts.currentUser.email,
        password : contexts.currentUser.password,
        image:contexts.currentUser.avatar
      },
      onSubmit: values => {
          const formdata = new FormData();
          formdata.append('name', values.name);
          formdata.append('email', values.email);
          formdata.append('password', values.password);
          formdata.append('image', values.image);

          setloading(true);
          axios.post(`${MainApi}/updateuser`,formdata)
          .then(res => {
              if(res.data[0].email){
                  contexts.setcurrentUser(res.data[0]);
                  setloading(false);
                  contexts.setalert({status:'ok',message:'Profile updated...'});
              }else{
                  console.log(res)
              }
          })
          .catch(err => console.log('api error:',err));
      },
    });

  const handleDoctorImage = (e) => {
    let output = document.getElementById('imageShow');
    var file = e.target.files[0];
    var imageType = /image.*/;

    values.image = file;

    if (file.type.match(imageType)){
        var reader = new FileReader();
        reader.onload = function(e) 
        {
          output.innerHTML = "";
          var img = new Image();
          img.src = reader.result;
          output.appendChild(img);
        }
        reader.readAsDataURL(file);             
    }else {
        output.innerHTML = "File not supported!";
      }
  }

  return (
    <div className='w-11/12 md:w-11/12 h-fit bg-white rounded-md mx-auto flex flex-col md:flex-row justify-between py-4 px-5'>
        <div className='basis-1/2 w-full flex justify-between'>
          {
            loading ? <ClapSpinner className='mt-10' color='#ea580b' size={35} loading={loading}/> :
            <div className='w-full flex flex-col items-center'>
              <h2 className='text-2xl font-semibold'>Update Profile</h2>
              <form className='w-full' onSubmit={handleSubmit}>
                  <div className='flex flex-col gap-2'>
                      <label htmlFor="name">Name</label>
                      <input required onChange={handleChange} onBlur={handleBlur} value={values.name} className='px-4 py-3 focus:outline-none rounded-xl border border-neutral-400' type="text" name="" id="name" />
                  </div>
                  <div className='flex flex-col gap-2'>
                      <label htmlFor="email">Email</label>
                      <input required onChange={handleChange} onBlur={handleBlur} value={values.email} className='px-4 py-3 focus:outline-none rounded-xl border border-neutral-400' type="email" name="" id="email" />
                  </div>
                  <div className='flex flex-col gap-2'>
                      <label htmlFor="password">Password</label>
                      <input required onChange={handleChange} onBlur={handleBlur} value={values.password} className='px-4 py-3 focus:outline-none rounded-xl border border-neutral-400' type="password" name="" id="password" />
                  </div>
                  <div className='flex flex-col gap-2'>
                      <h4>Profile photo</h4>
                      <label id='imageShow' htmlFor='doctorimage' className='relative rounded-md overflow-hidden object-cover w-full h-fit max-h-[500px] hover:bg-neutral-200 duration-200 flex justify-center cursor-pointer items-center border border-dotted border-neutral-400'>
                          <div className='flex flex-col justify-center items-center h-32'>
                              <h4 className='text-md text-black/30'>Update profile Photo</h4>
                              <GoCloudUpload className='text-4xl'/>
                          </div>
                          <img src={contexts.currentUser.avatar} className='w-full h-fit absolute' alt="" />
                      </label>
                      <input type="file" onChange={handleDoctorImage} name="" id="doctorimage" hidden />
                  </div>
                  <input className='mt-3 w-full px-4 py-3 bg-neutral-600 hover:bg-neutral-700 cursor-pointer duration-200 text-white text-lg rounded-xl' type="submit" value="Update" id="" />
              </form>
            </div>
          }
        </div>
          {
            <WantTo/>
          }
    </div>
  )
}

export default UpdateProfile