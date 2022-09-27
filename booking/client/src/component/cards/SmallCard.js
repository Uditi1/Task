import { currencyFormatter } from "../../actions/stripe";

const SmallCard = ({ h }) => 
    <>

        {/* <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img 
                    src="https://placeholder.com/900x500.png?text=MERN+booking " 
                    alt="default hotel image" 
                    className="card-image img img-fluid"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{h.title} <span className="float-right text-primary">
                            {currencyFormatter({
                                amount: h.price,
                                currency: 'usd'
                            })}
                            
                            </span></h5>
                            <p className="alert alert-info">{h.location}</p>
                            <p className="card-text">{`${h.content.substring(1, 200)}...`}</p>
                    </div>
                </div>
            </div>
        </div>  */}
    </>;

   


export default SmallCard;