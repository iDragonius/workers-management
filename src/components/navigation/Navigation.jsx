import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from '../../layouts/authLayout/AuthLayout'
import SignUp from '../../pages/auth/signUp/SignUp'
import SignIn from '../../pages/auth/signIn/SignIn'
import MainLayout from '../../layouts/mainLayout/MainLayout'
import StaffAdding from '../../pages/staffAdding/StaffAdding'
import HR from '../../pages/hr/HR'
import NonWorkingDays from '../../pages/hr/nonWorkingDays/NonWorkingDays'
import Duty from '../../pages/hr/duty/Duty'
import Awards from '../../pages/hr/awards/Awards'
import Dashboard from '../../pages/dashboard/Dashboard'
import Salary from '../../pages/salary/Salary'
import Vacation from '../../pages/vacation/Vacation'
import Tabel from '../../pages/tabel/Tabel'
import Permissions from '../../pages/permissions/Permissions'
import WorkingHours from '../../pages/workingHours/WorkingHours'
import Illness from '../../pages/illness/Illness'
import Admin from '../../pages/admin/Admin'
import UsersList from '../../pages/admin/pages/usersList/UsersList'
import User from '../../pages/admin/pages/user/User'
import Token from '../../pages/admin/pages/token/Token'
import Profile from '../../pages/profile/Profile'
import RoleWrapper from '../../features/roles/RoleWrapper'
import ChangePassword from '../../pages/profile/changePassword/ChangePassword'
import MainInfo from '../../pages/profile/mainInfo/MainInfo'
import AuthRequire from '../../features/auth/AuthRequire'
import Staff from '../../pages/staffAdding/Staff'
import StaffList from '../../pages/staffAdding/StaffList'
import WorkingHoursList from '../../pages/workingHours/WorkingHoursList'
import WorkingHoursAdd from '../../pages/workingHours/WorkingHoursAdd'
import WorkingHoursListUser from '../../pages/workingHours/WorkingHoursListUser'
import IllnessList from '../../pages/illness/IllnessList.jsx'
import IllnessListUser from '../../pages/illness/IllnessListUser.jsx'
import IllnessAdd from '../../pages/illness/IllnessAdd.jsx'
import PermissionsList from '../../pages/permissions/PermissionsList.jsx'
import PermissionsListUser from '../../pages/permissions/PermissionsListUser.jsx'
import PermissionsAdd from '../../pages/permissions/PermissionsAdd.jsx'
import AdminList from '../pages/AdminList.jsx'
import Notifications from '../../pages/notifications/Notifications.jsx'
import PermissionsCheck from '../../pages/permissions/PermissionsCheck.jsx'
import IllnessCheck from '../../pages/illness/IllnessCheck.jsx'
import StaffChange from '../../pages/staffAdding/StaffChange.jsx'
import WorkingHoursEdit from '../../pages/workingHours/WorkingHoursEdit.jsx'
import DutyList from '../../pages/hr/duty/DutyList.jsx'
import DutyAdd from '../../pages/hr/duty/DutyAdd.jsx'
import DutyChange from '../../pages/hr/duty/DutyChange.jsx'
import StateAdd from '../../pages/hr/state/StateAdd.jsx'
import State from '../../pages/hr/state/State.jsx'
import StateList from '../../pages/hr/state/StateList.jsx'
import StateChange from '../../pages/hr/state/StateChange.jsx'
import NonWorkingDaysList from '../../pages/hr/nonWorkingDays/NonWorkingDaysList.jsx'
import NonWorkingDaysAdd from '../../pages/hr/nonWorkingDays/NonWorkingDaysAdd.jsx'
import NonWorkingDaysChange from '../../pages/hr/nonWorkingDays/NonWorkingDaysChange.jsx'
import AwardsList from '../../pages/hr/awards/AwardsList.jsx'
import AwardsAdd from '../../pages/hr/awards/AwardsAdd.jsx'
import AwardsChange from '../../pages/hr/awards/AwardsChange.jsx'
import VacationList from '../../pages/vacation/VacationList.jsx'
import VacationListUser from '../../pages/vacation/VacationListUser.jsx'
import VacationCheck from '../../pages/vacation/VacationCheck.jsx'
import VacationAdd from '../../pages/vacation/VacationAdd.jsx'

const Navigation = () => {
    return (
        <Routes>
            <Route path={'/auth/'} element={<AuthLayout />}>
                <Route path={'sign-up'} element={<SignUp />} />
                <Route path={'sign-in'} element={<SignIn />} />
            </Route>
            <Route element={<AuthRequire />}>
                <Route path={'/'} element={<MainLayout />}>
                    <Route path={'/'} element={<Dashboard />} />
                    <Route path={'profile/'} element={<Profile />}>
                        <Route path={'main-info'} element={<MainInfo />} />
                        <Route
                            path={'change-password'}
                            element={<ChangePassword />}
                        />
                    </Route>
                    <Route path={'notifications'} element={<Notifications />} />
                    <Route element={<RoleWrapper routeRole={'3'} />}>
                        <Route element={<RoleWrapper routeRole={'2'} />}>
                            <Route path={'hr/'} element={<HR />}>
                                <Route
                                    path={'non-working-days'}
                                    element={<NonWorkingDays />}
                                >
                                    <Route
                                        path={'list'}
                                        element={<NonWorkingDaysList />}
                                    />
                                    <Route
                                        path={'add'}
                                        element={<NonWorkingDaysAdd />}
                                    />

                                    <Route
                                        path={'change/:id'}
                                        element={<NonWorkingDaysChange />}
                                    />
                                </Route>

                                <Route path={'duty/'} element={<Duty />} >
                                    <Route
                                        path={'list'}
                                        element={<DutyList />}
                                    />
                                    <Route
                                        path={'add'}
                                        element={<DutyAdd />}
                                    />

                                    <Route
                                        path={'change/:id'}
                                        element={<DutyChange />}
                                    />
                                </Route>
                                <Route path={'state/'} element={<State/>}>
                                    <Route
                                        path={'list'}
                                        element={<StateList />}
                                    />
                                    <Route
                                        path={'add'}
                                        element={<StateAdd />}
                                    />

                                    <Route
                                        path={'change/:id'}
                                        element={<StateChange />}
                                    />
                                </Route>
                                <Route path={'awards/'} element={<Awards/>}>
                                <Route
                                    path={'list'}
                                    element={<AwardsList />}
                                />
                                <Route
                                    path={'add'}
                                    element={<AwardsAdd />}
                                />

                                <Route
                                    path={'change/:id'}
                                    element={<AwardsChange />}
                                />
                            </Route>
                            </Route>
                            <Route path={'staff/'} element={<Staff />}>
                                <Route path={'add'} element={<StaffAdding />} />
                                <Route path={'list'} element={<StaffList />} />
                                <Route
                                    path={'change/:id'}
                                    element={<StaffChange />}
                                />
                            </Route>

                            <Route element={<RoleWrapper routeRole={'1'} />}>
                                <Route path={'admin/'} element={<Admin />}>
                                    <Route
                                        path={'users-list'}
                                        element={<UsersList />}
                                    />
                                    <Route
                                        path={'users-list/:id'}
                                        element={<User />}
                                    />
                                    <Route path={'token'} element={<Token />} />
                                </Route>
                            </Route>
                        </Route>
                        <Route path={'tabel'} element={<Tabel />} />
                        <Route path={'salary'} element={<Salary />} />
                    </Route>

                    <Route path={'vacation'} element={<Vacation />} >
                        <Route path={'list'} element={<VacationList />} />
                        <Route element={<RoleWrapper routeRole={'2'} />}>
                            <Route
                                path={'admin-list'}
                                element={<AdminList path={'vacation'} />}
                            />
                            <Route
                                path={'list/:id'}
                                element={<VacationListUser />}
                            />
                            <Route
                                path={'check/:id'}
                                element={<VacationCheck />}
                            />
                        </Route>
                        <Route path={'add'} element={<VacationAdd />} />

                    </Route>
                    <Route path={'permissions/'} element={<Permissions />}>
                        <Route path={'list'} element={<PermissionsList />} />
                        <Route element={<RoleWrapper routeRole={'2'} />}>
                            <Route
                                path={'admin-list'}
                                element={<AdminList path={'permissions'} />}
                            />
                            <Route
                                path={'list/:id'}
                                element={<PermissionsListUser />}
                            />
                            <Route
                                path={'check/:id'}
                                element={<PermissionsCheck />}
                            />
                        </Route>
                        <Route path={'add'} element={<PermissionsAdd />} />
                    </Route>

                    <Route path={'working-hours/'} element={<WorkingHours />}>
                        <Route path={'list'} element={<WorkingHoursList />} />
                        <Route element={<RoleWrapper routeRole={'2'} />}>
                            <Route
                                path={'admin-list'}
                                element={<AdminList path={'working-hours'} />}
                            />
                            <Route
                                path={'list/:id'}
                                element={<WorkingHoursListUser />}
                            />
                            <Route
                                path={'edit/:id'}
                                element={<WorkingHoursEdit />}
                            />
                        </Route>
                        <Route path={'add'} element={<WorkingHoursAdd />} />
                    </Route>
                    <Route path={'illness/'} element={<Illness />}>
                        <Route path={'list'} element={<IllnessList />} />
                        <Route element={<RoleWrapper routeRole={'2'} />}>
                            <Route
                                path={'admin-list'}
                                element={<AdminList path={'illness'} />}
                            />
                            <Route
                                path={'list/:id'}
                                element={<IllnessListUser />}
                            />
                            <Route
                                path={'check/:id'}
                                element={<IllnessCheck />}
                            />
                        </Route>
                        <Route path={'add'} element={<IllnessAdd />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default Navigation
