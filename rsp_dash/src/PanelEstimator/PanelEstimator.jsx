import React, { useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PDFRecieptBuilder from './Component/PDFRecieptBuilder';
import QuoteForm from './Component/QuoteForm';

function PanelEstimator() {
    const [quoteview, setQuoteview] = useState(true);
    const [modview, setModView] = useState(false);
    const [estimateview, setEstimateView] = useState(false);
    const [costview, setCostView] = useState(false);
 

    const switchViews = (view) => {
        setQuoteview(view === 'quotefrom');
        setEstimateView(view === 'estimateview');
        setCostView(view === 'costview');
        setModView(view === 'modview');
    };

    return (
        <div className="container mt-20 mb-6 mx-auto px-4 py-8 bg-white rounded-lg shadow-2xl">
            {quoteview ? <QuoteForm /> : <>Cost</>}
            <div className="mt-6 flex justify-between">
                <div className='space-x-4'>
                    <button type="button" onClick={() => switchViews('quoteview')} className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Build Quote
                    </button>
                    <button type="button" onClick={() => switchViews('estimateview')} className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        View Estimate
                    </button>
                    <button type="submit" onClick={() => switchViews('costview')} className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        View Cost Analysis
                    </button>
                    <button type="button" onClick={() => switchViews('modview')} className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        View Modification Sheet
                    </button>
                </div>
                <div className='space-x-4'>
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button type="submit" className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Create Quote
                    </button>
                    <button type="button" className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Preview Quote PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PanelEstimator;
