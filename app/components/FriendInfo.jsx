import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


export class FriendInfo extends React.Component {
    render() {
        let {friendInfo} = this.props;
        let renderFriendInfo = () => {
            if(friendInfo == null) {
                return (<div> Not chatting with anyone </div>);
            }
            else {
                return (
                    <div>
                        <div className="custom-div-sm visible-lg visible-md">
                            <img className="thumb-friend img-thumbnail img-responsive visible-lg visible-md" src={friendInfo.picture}/>
                            <img className="thumb-friend-small img-thumbnail img-responsive visible-xs visible-sm" src={friendInfo.picture}/>
                            <p className="custom-name-top visible-lg visible-md"><strong>{friendInfo.name} </strong></p>
                        </div>

                        <div className="visible-sm visible-xs">
                            <img className="thumb-friend-small img-thumbnail img-responsive visible-xs visible-sm" src={friendInfo.picture}/>
                        </div>

                        <div className="visible-sm visible-xs">
                            <p className="custom-name-top-small name"><strong>{friendInfo.name} </strong></p>
                        </div>
                    </div>
                );
            }
        }
        return (
            <div>
                {renderFriendInfo()}
            </div>
        );
    }
}


export default connect()(FriendInfo);
