import React, { Component } from "react";
import { getSpecifiedUserDataController } from "../../actions/userActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class UserProfile extends Component {
  componentDidMount() {
    console.log("called");
    this.props.getSpecifiedUserDataController(this.props.query);
  }

  render() {
    return (
      <React.Fragment>
        {console.log("rendered")}
        {/* {console.log(this.props.userObserved)} */}
        <div>
          {this.props.userObserved ? this.props.userObserved.username : ""}
        </div>
        <ul>
          {this.props.userObserved
            ? this.props.userObserved.projects
                .populate()
                .map(({ _id, name, img }) => (
                  <Link to={{ pathname: "/projects/" + _id }} key={_id}>
                    <li className="project-list-item">
                      <figure class="figure">
                        <h4 class="text-center">{name}</h4>
                      </figure>
                    </li>
                  </Link>
                ))
            : ""}
        </ul>
      </React.Fragment>
    );
  }
}

UserProfile.propTypes = {
  getSpecifiedUserDataController: PropTypes.func.isRequired,
  userObserved: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userObserved: state.user.userDetail,
  // userObservedName: state.user.userDetail.username,
  // userObservedProjects: state.user.userDetail.projects,
});

export default connect(mapStateToProps, { getSpecifiedUserDataController })(
  UserProfile
);
