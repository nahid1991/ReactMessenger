import React from 'react';
import FriendInfo from 'FriendInfo';
import {connect} from 'react-redux';

export class ProfileDetail extends React.Component {
    render() {
        return (
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 custom-div pre-scrollable">
                <FriendInfo friendInfo={this.props.friendInfo === null? null:this.props.friendInfo}/>
            </div>
        );
    }
}


const mapStateToProps = function (store) {
    return {
        friendsInfo: store.friendsInfo
    }
}
export default connect(mapStateToProps)(ProfileDetail);
