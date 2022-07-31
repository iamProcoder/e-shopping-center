import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addCartAlert, clearAlert, removeCartAlert } from '../redux/order/orderSlice';

const AddRemoveAlert = () => {
    const dispatch = useAppDispatch();
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const isAddCartAlert = useAppSelector<boolean>(addCartAlert);
    const isRemoveCartAlert = useAppSelector<boolean>(removeCartAlert);

    useEffect(() => {
        if (isAddCartAlert || isRemoveCartAlert) setIsAlert(true);
        setTimeout(() => {
            dispatch(clearAlert());
            setIsAlert(false);
        }, 5000);
    }, [dispatch, isAddCartAlert, isRemoveCartAlert]);

    const prefixColor = isAddCartAlert ? 'text-green-800 bg-green-300 shadow-green-500/50' : isRemoveCartAlert ? 'text-red-800 bg-red-300 shadow-red-500/50' : '';

    return (
        <>
        {
            isAlert && (
                <div className="w-full space-y-2">
                    <div className={`px-4 py-2 w-full rounded shadow-lg ${prefixColor}`} role="alert">
                        Product {isAddCartAlert ? 'Added': isRemoveCartAlert ? 'Removed': ''}
                    </div>
                </div>
            )
        }
        </>
    );
}

export default AddRemoveAlert