import React from "react";
import { useSelector } from "react-redux";
import '../Loader/Loader.css';
import loadingImg from '../../images/Loading/loading.gif'

export default function Loader() {
    const loading = useSelector((state) => state.loading);

    return (
        <div>
            {loading && (
                <div className="loading">
                    <img className="imageLoading" src={loadingImg} alt='img'/>
                </div>
            )}

        </div>
    )
}