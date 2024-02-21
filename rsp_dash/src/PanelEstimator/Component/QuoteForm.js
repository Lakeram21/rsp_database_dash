import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function QuoteForm() {
    // Form Data
    const [customerName, setCustomerName] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [enclosureModel, setEnclosureModel] = useState("")
    const [enclosureNumber, setEnclosureNumber] = useState(0)
    const [enclosureSize, setEnclosureSize] = useState("")
    const [backPanelSize, setBackPanelSize] = useState("")
    const [enclosureMaterial, setEnclosureMaterial] = useState("")
    const [purchasedRSP,setPurchasedRSP] = useState(null)
    const [cadprovided, setCADProvided] = useState(null)
    const [doorModified, setDoorModified] = useState(null)
    const [numberSideModify, setNumberSidesModify] = useState(null)
    const [steelComp, setSteelComp] = useState(null)
    const [steel304Comp, set304SteelComp] = useState(null)
    const [steel316Comp, set316SteelComp] = useState(null)
    const [nonMetallicComp, setNonMetallic] = useState(null)
    const [enclosureSizeSmall, setEnclosureSizeSmall] = useState(null)
    const [enclosureSizeMedium, setEnclosureSizeMedium] = useState(null)
    const [enclosureSizeLarge, setEnclosureSizeLarge] = useState(null)
    const [num22Hole, setNum22Hole] = useState(null)
    const [num30Hole, setNum30Hole] = useState(null)
    const [numQuaterHole, setNumHoleUnderQuater] = useState(null)
    const [numTappedHole, setNumTappedHole] = useState(null)




    const [holeInputs, setHoleInputs] = useState([{ id: 1, value: '' }]);
    const [linearInches, setlinearInches] = useState([{ id: 1, value: '' }]);

     // Handle the dynamic rendering and adding of input fields
     const addMoreHoles = (e) => {
        e.preventDefault();
        const newHoleId = holeInputs.length + 1;
        setHoleInputs([...holeInputs, { id: newHoleId, value: '' }]);
    };

    const handleInputChange = (id, value) => {
        const updatedHoleInputs = holeInputs.map((hole) =>
        hole.id === id ? { ...hole, value } : hole
        );
        setHoleInputs(updatedHoleInputs);
    };

    const addMoreLinearInch = (e) => {
        e.preventDefault();
        const newHoleId = linearInches.length + 1;
        setlinearInches([...linearInches, { id: newHoleId, value: '' }]);
    };

    const handleLinearInputChange = (id, value) => {
        const updatedHoleInputs = linearInches.map((hole) =>
        hole.id === id ? { ...hole, value } : hole
        );
        setlinearInches(updatedHoleInputs);
    };

  return (
    <form 
    // style={{ display: 'none' }}
    >
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Half of Form */}
            <div className="border-b border-r border-gray-300 pb-8">
                    <h2 className="text-4xl font-semibold text-orange-600 mb-4">Fabrication Quote Worksheet</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Make sure that you have collected the CAD and necessary drawings.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6">
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                                Customer Name:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                            
                                <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Enter Full Name"
                                onChange={(event)=>setCustomerName(event.target.value)}
                                />
                            </div>
                            
                        </div>
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                                Date:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                className=" text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholderText="Select a date"
                                />
                            </div>
                            
                        </div>

                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                                Enclosure Model:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                {/* <span className="flex items-center px-3 text-gray-500 text-sm bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                                workcation.com/
                                </span> */}
                                <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Enter a Model Number"
                                onChange={(event)=> setEnclosureModel(event.target.value)}
                                />
                            </div>
                            
                        </div>

                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                                Number of Enclosure:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                {/* <span className="flex items-center px-3 text-gray-500 text-sm bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                                workcation.com/
                                </span> */}
                                <input
                                type="number"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Enter a Number"
                                onChange={(event)=>setEnclosureNumber(event.target.value)}
                                />
                            </div>
                            
                        </div>

                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                                Enclosure Size:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                {/* <span className="flex items-center px-3 text-gray-500 text-sm bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                                workcation.com/
                                </span> */}
                                <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Ex. 12 x 13 x 14"
                                onChange={(event)=>setEnclosureSize(event.target.value)}
                                />
                            </div>
                            
                        </div>

                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                                Back Panel Size:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                {/* <span className="flex items-center px-3 text-gray-500 text-sm bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                                workcation.com/
                                </span> */}
                                <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Ex. 12 x 13 x 14"
                                onChange={(event)=>setBackPanelSize(event.target.value)}
                                />
                            </div>
                            
                        </div>

                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                                Enclosure Material:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                {/* <span className="flex items-center px-3 text-gray-500 text-sm bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                                workcation.com/
                                </span> */}
                                <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Enter a valid Material"
                                onChange={(event)=>setEnclosureMaterial(event.target.value)}
                                />
                            </div>
                            
                        </div>

                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                                Enclosure Purchased from RSP:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select
                                id="enclosure-material"
                                name="enclosure-material"
                                // value={enclosureMaterial}
                                // onChange={handleMaterialChange}
                                className="block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                onChange={(event)=>setPurchasedRSP(event.target.value)}
                                >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                            </div>
                            
                        </div>

                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                                CAD Drawing Provided:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select
                                id="enclosure-material"
                                name="enclosure-material"
                                // value={enclosureMaterial}
                                // onChange={handleMaterialChange}
                                className="block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                onChange={(event)=>setCADProvided(event.target.value)}
                                >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                            </div>
                            
                        </div>

                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Door Modified:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select
                                id="enclosure-material"
                                name="enclosure-material"
                                // value={enclosureMaterial}
                                // onChange={handleMaterialChange}
                                className="block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                onChange={(event)=>setDoorModified(event.target.value)}
                                >
                                <option value=""></option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                </select>
                            </div>
                            
                        </div>

                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Number of Sides Modified including door:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                {/* <span className="flex items-center px-3 text-gray-500 text-sm bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                                workcation.com/
                                </span> */}
                                <input
                                type="number"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Enter the Number of of Sides"
                                onChange={(event)=>setNumberSidesModify(event.target.value)}
                                />
                            </div>
                            
                        </div>
                        
                        
                    </div>

                    <h2 className="mt-10 text-left text-xl font-semibold text-orange-800 mb-4">Enclosure Composition</h2>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6">
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Steel:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select
                                id="enclosure-material"
                                name="enclosure-material"
                                // value={enclosureMaterial}
                                // onChange={handleMaterialChange}
                                className="block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                onChange={(event)=>setSteelComp(event.target.value)}
                                >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                            </div>
                            
                        </div>
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            304 Steel:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select
                                id="enclosure-material"
                                name="enclosure-material"
                                // value={enclosureMaterial}
                                // onChange={handleMaterialChange}
                                className="block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                onChange={(event)=>set304SteelComp(event.target.value)}
                                >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                            </div>
                            
                        </div>
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            316 Steel:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select
                                id="enclosure-material"
                                name="enclosure-material"
                                // value={enclosureMaterial}
                                // onChange={handleMaterialChange}
                                className="block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                onChange={(event)=>set316SteelComp(event.target.value)}

                                >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                            </div>
                            
                        </div>
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Non Metallic:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select
                                id="enclosure-material"
                                name="enclosure-material"
                                // value={enclosureMaterial}
                                // onChange={handleMaterialChange}
                                className="block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                onChange={(event)=>setNonMetallic(event.target.value)}

                                >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                            </div>
                            
                        </div>
                        

                    </div>
                    
                    <h2 className="mt-6 text-left text-xl font-semibold text-orange-800 mb-4">Enclosure Size</h2>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6">
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Small (30" & Under):
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select
                                id="enclosure-material"
                                name="enclosure-material"
                                // value={enclosureMaterial}
                                // onChange={handleMaterialChange}
                                className="block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                onChange={(event)=>setEnclosureSizeSmall(event.target.value)}

                                >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                            </div>
                            
                        </div>
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Medium (36" & 48"):
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select
                                id="enclosure-material"
                                name="enclosure-material"
                                // value={enclosureMaterial}
                                // onChange={handleMaterialChange}
                                className="block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                onChange={(event)=>setEnclosureSizeMedium(event.target.value)}

                                >
                                <option value=""></option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                </select>
                            </div>
                            
                        </div>
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Large (Over 36"):
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select
                                id="enclosure-material"
                                name="enclosure-material"
                                // value={enclosureMaterial}
                                // onChange={handleMaterialChange}
                                className="block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                onChange={(event)=>setEnclosureSizeLarge(event.target.value)}

                                >
                                <option value=""></option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                </select>
                            </div>
                            
                        </div>                  

                    </div>
                    
                    <h2 className="mt-10 text-left text-xl font-semibold text-orange-800 mb-4">Holes</h2>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6">
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Number of 22mm Hole:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                            
                                <input
                                type="number"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Enter Hole number"
                                onChange={(event)=>setNum22Hole(event.target.value)}

                                />
                            </div>
                            
                        </div>
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Number of  30mm Hole:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                            
                                <input
                                type="number"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Enter Hole number"
                                onChange={(event)=>setNum30Hole(event.target.value)}

                                />
                            </div>
                            
                        </div>
                        
                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Number of Holes Under  1/4":
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                            
                                <input
                                type="number"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Enter Hole number"
                                onChange={(event)=>setNumHoleUnderQuater(event.target.value)}

                                />
                            </div>
                            
                        </div>

                        <div className="flex-col sm:col-span-4">
                            <label htmlFor="username" className="flex text-sm font-medium text-gray-700">
                            Number of Tapped Holes:
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                            
                                <input
                                type="number"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                placeholder="Enter Hole number"
                                onChange={(event)=>setNumTappedHole(event.target.value)}

                                />
                            </div>
                            
                        </div>              

                    </div>

                    <div>

                        <h2 className="mt-6 sm:mt-10 text-left text-xl font-semibold text-orange-800 mb-4">Holes Over 1/4"</h2>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            {holeInputs.map((hole) => (
                            <div key={hole.id} className="mb-6  sm:mb-0">
                                <div className="mt-2 border-r ml-2 rounded-md shadow-sm">
                                <label htmlFor={`number-${hole.id}`} className="flex text-sm font-medium text-gray-700">
                                    Number:
                                </label>
                                <input
                                    type="number"
                                    // id={`number-${hole.id}`}
                                    // name={`number-${hole.id}`}
                                    // autoComplete={`number-${hole.id}`}
                                    className="text-center text-sm block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                    placeholder="Enter Number"
                                    value={hole.value}
                                    onChange={(e) => handleInputChange(hole.id, e.target.value)}
                                />
                                </div>

                                <div className="mt-6 border-r ml-2 rounded-md shadow-sm">
                                <label htmlFor={`diameter-${hole.id}`} className="flex text-sm font-medium text-gray-700">
                                    Diameter:
                                </label>
                                <input
                                    type="number"
                                    id={`diameter-${hole.id}`}
                                    name={`diameter-${hole.id}`}
                                    autoComplete={`diameter-${hole.id}`}
                                    className="text-center text-sm block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                    placeholder="Enter Diameter"
                                    value={hole.value}
                                    onChange={(e) => handleInputChange(hole.id, e.target.value)}
                                />
                                </div>

                                <div className="mt-6 border-r ml-2 rounded-md shadow-sm">
                                <label htmlFor={`milling-${hole.id}`} className="flex text-sm font-medium text-gray-700">
                                    Milling:
                                </label>
                                <p className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600">2</p>
                                </div>

                                <div className="mt-6 border-r ml-2 rounded-md shadow-sm">
                                <label htmlFor={`radius-${hole.id}`} className="flex text-sm font-medium text-gray-700">
                                    Radius:
                                </label>
                                <p className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600">2</p>
                                </div>

                                <div className="mt-6 border-r ml-2 rounded-md shadow-sm">
                                <label htmlFor={`factor-${hole.id}`} className="flex text-sm font-medium text-gray-700">
                                    Factor:
                                </label>
                                <p className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600">2</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        <button
                            className="mt-4 bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                            onClick={addMoreHoles}
                        >
                            Add More Holes
                        </button>
                    </div>


                    <div>
                        <h2 className="mt-10 text-left text-xl font-semibold text-orange-800 mb-4">Linear Inches</h2>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6">
                            {linearInches.map((hole) => (
                            <div key={hole.id} className="flex-col sm:col-span-4">
                                
                                <div className="mt-1 rounded-md shadow-sm">
                                    <label htmlFor={`hole-${hole.id}`} className="flex text-sm font-medium text-gray-700">
                                    Linear Inches:
                                    </label>
                                    <input
                                        type="number"
                                        id={`hole-${hole.id}`}
                                        name={`hole-${hole.id}`}
                                        autoComplete={`hole-${hole.id}`}
                                        className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                        placeholder="Enter Number of Holes"
                                        value={hole.value}
                                        onChange={(e) => handleLinearInputChange(hole.id, e.target.value)}
                                    />                                    
                                </div>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <label htmlFor={`hole-${hole.id}`} className="flex text-sm font-medium text-gray-700">
                                    Milling Inches:
                                    </label>
                                    <input
                                        type="number"
                                        id={`hole-${hole.id}`}
                                        name={`hole-${hole.id}`}
                                        autoComplete={`hole-${hole.id}`}
                                        className="text-center block w-full border-gray-300 py-2 pl-1 text-gray-700 placeholder-gray-400 focus:ring focus:border-indigo-600"
                                        placeholder="Enter Number of Holes"
                                        value={hole.value}
                                        onChange={(e) => handleLinearInputChange(hole.id, e.target.value)}
                                    />                                    
                                </div>
                                
                                
                            </div>
                            
                            ))}
                        </div>
                        <button
                            className="mt-4 bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                            onClick={addMoreLinearInch}
                        >
                            Add More Holes
                        </button>
                    </div>

            </div>

            <div className="mt-10 border-b border-gray-300 pb-8">
                                            
                    <h2 className="mt-10 text-left text-xl font-semibold text-orange-800 mb-4">Job Detail (View Only)</h2>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 text-gray-400 sm:grid-cols-6">
                        
                        <div className="block mt-2 p-2 sm:col-span-4 border-b">
                            <p className='text-left text-m font-semibold'>Date: <span>{selectedDate?.toLocaleDateString()}</span></p>
                            <p className='text-left text-m font-semibold'>Customer Name: <span>{customerName}</span></p>
                        </div>
                        <div className="block mt-2 p-2 sm:col-span-4 border-b">
                            <p className='text-left text-m font-semibold'>Enclosure Model: <span>{enclosureModel}</span></p>
                            <p className='text-left text-m font-semibold'>Number Of Enclosure: <span>{enclosureNumber}</span></p>
                            <p className='text-left text-m font-semibold'>Enclosure Size: <span>{enclosureSize}</span></p>
                            <p className='text-left text-m font-semibold'>Back Panel Size: <span>{backPanelSize}</span></p>
                            <p className='text-left text-m font-semibold'>Enclosure Material: <span>{enclosureMaterial}</span></p>

                            <p className='text-left text-m font-semibold'>Enclosure Purchased from RSP: <span>{purchasedRSP}</span></p>
                            <p className='text-left text-m font-semibold'>CAD Drawing Provided: <span>{cadprovided}</span></p>
                            <p className='text-left text-m font-semibold'>Door Modified: <span>{doorModified}</span></p>
                            <p className='text-left text-m font-semibold'>Number of Sides Modified including door: <span>{numberSideModify}</span></p>
                        </div>
                        <div className="block mt-2 p-2 sm:col-span-4 border-b">
                            <p className='text-left text-xl border-b font-semibold'>Enclosure Composition</p>
                            <p className='text-left text-m font-semibold'>Steel:<span>{steelComp}</span></p>
                            <p className='text-left text-m font-semibold'>304 Stainless: <span>{steel304Comp}</span></p>
                            <p className='text-left text-m font-semibold'>316 Stainless: <span>{steel316Comp}</span></p>
                            <p className='text-left text-m font-semibold'>Non-Metallic: <span>{nonMetallicComp}</span></p>
                           
                        </div>

                        <div className="block mt-2 p-2 sm:col-span-4 border-b">
                            <p className='text-left text-xl border-b font-semibold'>Enclosure Size</p>
                            <p className='text-left text-m font-semibold'>Small (30" & Under):<span>{enclosureSizeSmall}</span></p>
                            <p className='text-left text-m font-semibold'>Medium (36" & 48"): <span>{enclosureSizeMedium}</span></p>
                            <p className='text-left text-m font-semibold'>Large (Over 36"): <span>{enclosureSizeLarge}</span></p>
                                                           
                        </div>

                        <div className="block mt-2 p-2 sm:col-span-4 border-b">
                            <p className='text-left text-xl border-b font-semibold'>Cuts and Holes</p>
                            <p className='text-left text-m font-semibold'>Inches of Milling:<span></span></p>
                            <p className='text-left text-m font-semibold'>22mm Hole: <span>{num22Hole}</span></p>
                            <p className='text-left text-m font-semibold'>30mm Hole: <span>{num30Hole}</span></p>
                            <p className='text-left text-m font-semibold'>Thru Drill Holes 1/4" or less: <span></span></p>
                            <p className='text-left text-m font-semibold'>Threaded Drill Holes 1/4" or less: <span></span></p>
                          

                                                           
                        </div>

                        <div className="block mt-2 p-2 sm:col-span-4 border-b">
                            <p className='text-left text-xl border-b font-semibold  text-orange-800'>Individual Price<span></span></p>
                            <p className='text-left text-m font-semibold'>Outside Enclosure Fee Each:<span></span></p>
                            <p className='text-left text-m font-semibold'>CAD Production Fee Each: <span></span></p>
                            <p className='text-left text-m font-semibold'>Handling Fee Each: <span></span></p>
                            <p className='text-left text-m font-semibold'>Cutting, Drilling, Thread Each: <span></span></p>
                            <p className='text-left text-m font-semibold'>Set UP & Packaging Each: <span></span></p>
                            <p className='text-left text-m font-semibold'>Price EACH: <span></span></p>
                                                                                          
                        </div>
                        <div className="block mt-2 p-2 sm:col-span-4 border-b">
                            <p className='text-left text-xl border-b font-semibold  text-orange-800'>Total Price<span></span></p>
                            <p className='text-left text-m font-semibold'>Outside Enclosure Fee:<span></span></p>
                            <p className='text-left text-m font-semibold'>CAD Production Fee: <span></span></p>
                            <p className='text-left text-m font-semibold'>Handling Fee: <span></span></p>
                            <p className='text-left text-m font-semibold'>Cutting, Drilling, Thread: <span></span></p>
                            <p className='text-left text-m font-semibold'>Set UP & Packaging: <span></span></p>
                            <p className='text-left text-m font-semibold'>Total Price: <span></span></p>
                                                                                          
                        </div>

                    </div>
               
            </div>
            
        </div>

        {/* Submit Buttons */}
       
    </form>
  )
}

export default QuoteForm