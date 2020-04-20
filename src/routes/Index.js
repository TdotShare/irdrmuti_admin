import React from 'react'

import TemplateMain from '../templates/index'



import LoginSrceen from '../../src/components/auth/login'

import DashboardSrceen from '../../src/components/screens/dashboard'

import PostSrceen from '../../src/components/screens/post'
import PostCreateSrceen from '../../src/components/screens/post/create'
import PostEditSrceen from '../../src/components/screens/post/edit'
import PostExtensionSrceen from '../../src/components/screens/post/extension'


import MenuSrceen from '../../src/components/screens/menu'
import MenuCreateSrceen from '../../src/components/screens/menu/create'
import MenuEditSrceen from '../../src/components/screens/menu/edit'


import MenuSubSrceen from '../../src/components/screens/menusub'
import MenuSubCreateSrceen from '../../src/components/screens/menusub/create'
import MenuSubEditSrceen from '../../src/components/screens/menusub/edit'


import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from 'react-redux'
import Navigation from '../config/navigation'

function Index(props) {

    const authenticate = useSelector(state => state.user.authenticate)

    return (
        <Router basename={'2020/admin'}>
            {
                authenticate ?


                    <Authen
                        authen={
                            <TemplateMain
                                body={
                                    <Switch>
                                        <Route exact path={`${Navigation.PageDashboard}`} component={() => <DashboardSrceen />} />

                                        <Route exact path={`${Navigation.PagePost}`} component={() => <PostSrceen />} />
                                        <Route exact path={`${Navigation.PagePost_Create}`} component={() => <PostCreateSrceen />} />
                                        <Route exact path={`${Navigation.PagePost_Edit}/:id`} component={() => <PostEditSrceen />} />
                                        <Route exact path={`${Navigation.PagePost_Extension}/:id`} component={() => <PostExtensionSrceen />} />

                                        <Route exact path={`${Navigation.PageMenu}`} component={() => <MenuSrceen />} />
                                        <Route exact path={`${Navigation.PageMenu_Create}`} component={() => <MenuCreateSrceen />} />
                                        <Route exact path={`${Navigation.PageMenu_Edit}/:id`} component={() => <MenuEditSrceen />} />


                                        <Route exact path={`${Navigation.PageMenu_MenuSub}/:id`} component={() => <MenuSubSrceen />} />
                                        <Route exact path={`${Navigation.PageMenu_MenuSub_Create}/:id`} component={() => <MenuSubCreateSrceen />} />
                                        <Route exact path={`${Navigation.PageMenu_MenuSub_Edit}/:id`} component={() => <MenuSubEditSrceen />} />
                                    </Switch>
                                }
                            />
                        }
                    />



                    :

                    <Authen
                        authen={
                            <Switch>
                                <Route exact path={`${Navigation.PageLogin}`} component={() => <LoginSrceen />} />
                            </Switch>
                        }
                    />
            }

        </Router>
    )
}

const Authen = (props) => {

    const history = useHistory();
    const DateLogin = useSelector(state => state.user.date)
    const authenticate = useSelector(state => state.user.authenticate)
    const dispatch = useDispatch()

    React.useEffect(() => {

        let time = new Date()

        if (authenticate) {
            if (DateLogin != null) {
                if (DateLogin > time.getHours() || DateLogin < time.getHours()) {

                    dispatch({ type: 'deleteUser' })
                    dispatch({ type: 'logoutAuth' })
                    dispatch({ type: 'clearDateLogin' })

                    history.replace(Navigation.PageLogin);

                }
            }
        }else{
            history.replace(Navigation.PageLogin);
        }



    }, []) // eslint-disable-line 

    return (
        <React.Fragment>
            {props.authen}
        </React.Fragment>
    )

}


export default connect(null, null)(Index)