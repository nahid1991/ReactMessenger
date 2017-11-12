import React from 'react';
import {connect} from 'react-redux';


export class FriendInfo extends React.Component {
    render() {
        let {friendInfo} = this.props;
        return (
            <div>
                <div className="custom-div-sm visible-lg visible-md">
                    <img className="thumb-friend img-thumbnail img-responsive visible-lg visible-md" src={friendInfo ===null? null:friendInfo[0].picture}/>
                    <img className="thumb-friend-small img-thumbnail img-responsive visible-xs visible-sm" src={friendInfo ===null? null:friendInfo[0].picture}/>
                    <p className="custom-name-top visible-lg visible-md"><strong>{friendInfo ===null? null:friendInfo[0].name} </strong></p>
                </div>

                <div className="visible-sm visible-xs">
                    <img className="thumb-friend-small img-thumbnail img-responsive visible-xs visible-sm" src={friendInfo ===null? null:friendInfo[0].picture}/>
                </div>

                <div className="visible-sm visible-xs">
                    <p className="custom-name-top-small name"><strong>{friendInfo ===null? null:friendInfo[0].name} </strong></p>
                </div>
            </div>
        );
    }
}


export default connect()(FriendInfo);
