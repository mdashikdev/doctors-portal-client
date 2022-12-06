import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { AllContext, MainApi } from '../../App';
import { GoCloudUpload } from 'react-icons/go';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClapSpinner } from "react-spinners-kit";

const SignUpSection = ({logintoggle,setlogintoggle}) => {
    const contexts = useContext(AllContext);
    const [loading, setloading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const {handleSubmit,handleChange,handleBlur,values,resetForm} = useFormik({
        initialValues: {
          name : '',
          email : '',
          password : '',
          image:'',
        },
        onSubmit: values => {
            setloading(true)
            const formdata = new FormData();
            formdata.append('name', values.name);
            formdata.append('email', values.email);
            formdata.append('password', values.password);
            formdata.append('image', values.image);

            axios.post(`${MainApi}/createuser`,formdata)
            .then(res => {
                if(res.data[0].email){
                    contexts.setcurrentUser(res.data[0]);
                    setloading(false);
                    resetForm();
                    location.state ? navigate(`${location.state.from}`,{replace: true}) : navigate('/',{replace: true})
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
        loading ? <ClapSpinner className='mt-10' color='#ea580b' size={35} loading={loading}/> :
        <form onSubmit={handleSubmit}>
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
                <label id='imageShow' htmlFor='doctorimage' className='rounded-md overflow-hidden object-cover w-full h-fit max-h-[500px] hover:bg-neutral-200 duration-200 flex justify-center cursor-pointer items-center border border-dotted border-neutral-400'>
                    <div className='flex flex-col justify-center items-center h-32'>
                        <h4 className='text-md text-black/30'>Upload Your Photo</h4>
                        <GoCloudUpload className='text-4xl'/>
                    </div>
                </label>
                <input type="file" onChange={handleDoctorImage} name="" id="doctorimage" hidden />
            </div>
            <input className='mt-3 w-full px-4 py-3 bg-neutral-600 hover:bg-neutral-700 cursor-pointer duration-200 text-white text-lg rounded-xl' type="submit" value="Sign In" id="" />
            <div className='flex justify-center mt-2'>
                <p>{logintoggle ? 'New to Doctors Portal?' : 'Already an user?' }</p>
                <p className='text-[#19D3AE] font-semibold' onClick={() => setlogintoggle(!logintoggle)}> {logintoggle ? 'Create new account' : 'Login' }</p>
            </div>
        </form>
    )
}

export default SignUpSection