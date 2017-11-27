import React from 'react';
import FriendInfo from 'FriendInfo';
import {connect} from 'react-redux';
let store = require('configureStore').configure();

export class ProfileDetail extends React.Component {
    render() {
        let {friendsInfo, friendId} = this.props;
        let friendInfo = friendsInfo.filter(function(friend){
            if(friend._id == friendId) {
                return friend;
            }
        })[0];
        return (
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 custom-div pre-scrollable">
                <FriendInfo friendInfo={friendInfo}/>
            </div>
        );
    }
}


// const mapStateToProps = function (store) {
//     return {
//         friendsInfo: store.friendsInfo,
//         friendId: store.friendId
//     }
// }
export default connect()(ProfileDetail);
