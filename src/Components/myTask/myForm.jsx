import React, { useState, useEffect } from 'react';

const MyForm = () => {
      
    const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
    };
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    city: '',
    state: '',
    zip: '',
  });

  
  
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateStep = () => {
    const { name, email, phone, address1, city, state, zip } = formData;
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      address1: '',
      city: '',
      state: '',
      zip: '',
    };

    if (currentStep === 1) {
      if (!name.trim()) {
        newErrors.name = 'Name is required';
        valid = false;
      }
      if (!email.trim()) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = 'Email is invalid';
        valid = false;
      }
      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
        valid = false;
      }
    } else if (currentStep === 2) {
      if (!address1.trim()) {
        newErrors.address1 = 'Address Line 1 is required';
        valid = false;
      }
      if (!city.trim()) {
        newErrors.city = 'City is required';
        valid = false;
      }
      if (!state.trim()) {
        newErrors.state = 'State is required';
        valid = false;
      }
      if (!zip.trim()) {
        newErrors.zip = 'Zip Code is required';
        valid = false;
      }
    }
   
    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  
   
  const handleLogout = () => {
    localStorage.removeItem('formData');
    setFormData({
         ...formData,
         name: '',
         email: '',
         phone: '',
         address1: '',
         address2: '',
         city: '',
         state: '',    
         zip : ''         

    });
    setCurrentStep(1);  
};

  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <div className="mb-6">
          <ul className="flex justify-between">
            <li className={currentStep === 1 ? 'text-blue-500' : 'text-gray-500'}>Step 1</li>
            <li className={currentStep === 2 ? 'text-blue-500' : 'text-gray-500'}>Step 2</li>
            <li className={currentStep === 3 ? 'text-blue-500' : 'text-gray-500'}>Step 3</li>
          </ul>
        </div>

        {currentStep === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Step 1: Personal Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
                id="phone"
                type="text"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
            </div>
            {formData.zip !=="" ? 
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Logout
              </button>
            </div>
           :    
           <div className="flex justify-end">
           <button
             type="button"
             onClick={handleNext}
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >
             Next
           </button>
         </div>
        }
          
            
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Step 2: Address Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address1">
                Address Line 1
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address1 ? 'border-red-500' : ''}`}
                id="address1"
                type="text"
                placeholder="Address Line 1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                required
              />
              {errors.address1 && <p className="text-red-500 text-xs italic">{errors.address1}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address2">
                Address Line 2
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address2"
                type="text"
                placeholder="Address Line 2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                City
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.city ? 'border-red-500' : ''}`}
                id="city"
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && <p className="text-red-500 text-xs italic">{errors.city}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                State
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.state ? 'border-red-500' : ''}`}
                id="state"
                type="text"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              {errors.state && <p className="text-red-500 text-xs italic">{errors.state}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                Zip Code
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.zip ? 'border-red-500' : ''}`}
                id="zip"
                type="text"
                placeholder="Zip Code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
              {errors.zip && <p className="text-red-500 text-xs italic">{errors.zip}</p>}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Step 3: Confirmation</h2>
            <div className="mb-4">
              <p className="mb-1 flex items-center justify-between">
                <span className="font-bold">Name:</span> <span>{formData.name}</span>
              </p>
              <p className="mb-1 flex items-center justify-between">
                <span className="font-bold">Email:</span> <span>{formData.email}</span>
              </p>
              <p className="mb-1 flex items-center justify-between">
                <span className="font-bold">Phone:</span> <span>{formData.phone}</span>
              </p>
              <p className="mb-1 flex items-center justify-between">
                <span className="font-bold">Address Line 1:</span> <span>{formData.address1}</span>
              </p>
              <p className="mb-1 flex items-center justify-between">
                <span className="font-bold">Address Line 2:</span> <span>{formData.address2}</span>
              </p>
              <p className="mb-1 flex items-center justify-between">
                <span className="font-bold">City:</span> <span>{formData.city}</span>
              </p>
              <p className="mb-1 flex items-center justify-between">
                <span className="font-bold">State:</span> <span>{formData.state}</span>
              </p>
              <p className="mb-1 flex items-center justify-between">
                <span className="font-bold">Zip Code:</span> <span>{formData.zip}</span>
              </p>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default MyForm;
