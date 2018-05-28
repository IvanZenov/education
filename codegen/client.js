/// <reference path="../../typings/tsd.d.ts" />

import * as request from "superagent";
import {
    SuperAgentStatic
} from "superagent";

type CallbackHandler = (err: any, res ? : request.Response) => void;
type Users = {
    'name' ? : string

    'surname' ? : string

    'nickname' ? : string

    'country' ? : string

    'email' ? : string

    'contact' ? : string

};
type Mentors = {
    'name' ? : string

    'surname' ? : string

    'nickname' ? : string

    'courses' ? : string

    'rating' ? : string

};
type Mentor = {
    'name' ? : string

    'surname' ? : string

    'image' ? : string

    'courese' ? : string

    'experience' ? : string

    'chat link' ? : string

    'rating' ? : string

};
type MentorRate = {
    'current rating' ? : string

    'learnability' ? : string

    'enthusiasm' ? : string

    'main rating' ? : string

};
type UserRate = {
    'current rating' ? : string

    'main rating' ? : string

    'skills' ? : string

};
type Error = {
    'message': string

};

type Logger = {
    log: (line: string) => any
};

/**
 * 
 * @class ProductService
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class ProductService {

    private domain: string = "http://localhost:10010/api/v1";
    private errorHandlers: CallbackHandler[] = [];

    constructor(domain ? : string, private logger ? : Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    private request(method: string, url: string, body: any, headers: any, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        let req = (request as SuperAgentStatic)(method, url).query(queryParameters);

        Object.keys(headers).forEach(key => {
            req.set(key, headers[key]);
        });

        if (body) {
            req.send(body);
        }

        if (typeof(body) === 'object' && !(body.constructor.name === 'Buffer')) {
            req.set('Content-Type', 'application/json');
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        req.end((error, response) => {
            if (error || !response.ok) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    getRatingByNameURL(parameters: {
        'username': string,
        'skills' ? : string,
        'learnability' ? : string,
        'enthusiasm' ? : string,
        'mentorRate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/user';
        if (parameters['username'] !== undefined) {
            queryParameters['username'] = parameters['username'];
        }

        if (parameters['skills'] !== undefined) {
            queryParameters['Skills'] = parameters['skills'];
        }

        if (parameters['learnability'] !== undefined) {
            queryParameters['Learnability'] = parameters['learnability'];
        }

        if (parameters['enthusiasm'] !== undefined) {
            queryParameters['Enthusiasm'] = parameters['enthusiasm'];
        }

        if (parameters['mentorRate'] !== undefined) {
            queryParameters['Mentor Rate'] = parameters['mentorRate'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Rating of the mentor
     * @method
     * @name ProductService#getRatingByName
     * @param {string} username - The name that needs to be fetched.
     * @param {string} skills - Assessment of a mentor
     * @param {string} learnability - Assessment of a mentor
     * @param {string} enthusiasm - Assessment of a mentor
     * @param {string} mentorRate - Assessment of a mentor
     */
    getRatingByName(parameters: {
        'username': string,
        'skills' ? : string,
        'learnability' ? : string,
        'enthusiasm' ? : string,
        'mentorRate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/user';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['username'] !== undefined) {
                queryParameters['username'] = parameters['username'];
            }

            if (parameters['username'] === undefined) {
                reject(new Error('Missing required  parameter: username'));
                return;
            }

            if (parameters['skills'] !== undefined) {
                queryParameters['Skills'] = parameters['skills'];
            }

            if (parameters['learnability'] !== undefined) {
                queryParameters['Learnability'] = parameters['learnability'];
            }

            if (parameters['enthusiasm'] !== undefined) {
                queryParameters['Enthusiasm'] = parameters['enthusiasm'];
            }

            if (parameters['mentorRate'] !== undefined) {
                queryParameters['Mentor Rate'] = parameters['mentorRate'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    createUserURL(parameters: {
        'username': string,
        'name' ? : string,
        'courses' ? : string,
        'progress' ? : string,
        'mentorName' ? : string,
        'skills' ? : string,
        'learnability' ? : string,
        'enthusiasm' ? : string,
        'mentorRate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/user/{username}';

        path = path.replace('{username}', `${parameters['username']}`);
        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['courses'] !== undefined) {
            queryParameters['Courses'] = parameters['courses'];
        }

        if (parameters['progress'] !== undefined) {
            queryParameters['Progress'] = parameters['progress'];
        }

        if (parameters['mentorName'] !== undefined) {
            queryParameters['Mentor name'] = parameters['mentorName'];
        }

        if (parameters['skills'] !== undefined) {
            queryParameters['Skills'] = parameters['skills'];
        }

        if (parameters['learnability'] !== undefined) {
            queryParameters['Learnability'] = parameters['learnability'];
        }

        if (parameters['enthusiasm'] !== undefined) {
            queryParameters['Enthusiasm'] = parameters['enthusiasm'];
        }

        if (parameters['mentorRate'] !== undefined) {
            queryParameters['Mentor Rate'] = parameters['mentorRate'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Rating
     * @method
     * @name ProductService#createUser
     * @param {string} username - The name of the user
     * @param {string} name - The name of the user
     * @param {string} courses - The name of courses
     * @param {string} progress - How much is completed
     * @param {string} mentorName - How is a Mentor
     * @param {string} skills - Assessment of a mentor
     * @param {string} learnability - Assessment of a mentor
     * @param {string} enthusiasm - Assessment of a mentor
     * @param {string} mentorRate - Assessment of a mentor
     */
    createUser(parameters: {
        'username': string,
        'name' ? : string,
        'courses' ? : string,
        'progress' ? : string,
        'mentorName' ? : string,
        'skills' ? : string,
        'learnability' ? : string,
        'enthusiasm' ? : string,
        'mentorRate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/user/{username}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{username}', `${parameters['username']}`);

            if (parameters['username'] === undefined) {
                reject(new Error('Missing required  parameter: username'));
                return;
            }

            if (parameters['name'] !== undefined) {
                queryParameters['name'] = parameters['name'];
            }

            if (parameters['courses'] !== undefined) {
                queryParameters['Courses'] = parameters['courses'];
            }

            if (parameters['progress'] !== undefined) {
                queryParameters['Progress'] = parameters['progress'];
            }

            if (parameters['mentorName'] !== undefined) {
                queryParameters['Mentor name'] = parameters['mentorName'];
            }

            if (parameters['skills'] !== undefined) {
                queryParameters['Skills'] = parameters['skills'];
            }

            if (parameters['learnability'] !== undefined) {
                queryParameters['Learnability'] = parameters['learnability'];
            }

            if (parameters['enthusiasm'] !== undefined) {
                queryParameters['Enthusiasm'] = parameters['enthusiasm'];
            }

            if (parameters['mentorRate'] !== undefined) {
                queryParameters['Mentor Rate'] = parameters['mentorRate'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    updateUserURL(parameters: {
        'username': string,
        'skills' ? : string,
        'learnability' ? : string,
        'enthusiasm' ? : string,
        'mentorRate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/user/{username}';

        path = path.replace('{username}', `${parameters['username']}`);
        if (parameters['skills'] !== undefined) {
            queryParameters['Skills'] = parameters['skills'];
        }

        if (parameters['learnability'] !== undefined) {
            queryParameters['Learnability'] = parameters['learnability'];
        }

        if (parameters['enthusiasm'] !== undefined) {
            queryParameters['Enthusiasm'] = parameters['enthusiasm'];
        }

        if (parameters['mentorRate'] !== undefined) {
            queryParameters['Mentor Rate'] = parameters['mentorRate'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * This can only be done by the logged in user.
     * @method
     * @name ProductService#updateUser
     * @param {string} username - The name that needs to be fetched.
     * @param {string} skills - Assessment of a mentor
     * @param {string} learnability - Assessment of a mentor
     * @param {string} enthusiasm - Assessment of a mentor
     * @param {string} mentorRate - Assessment of a mentor
     */
    updateUser(parameters: {
        'username': string,
        'skills' ? : string,
        'learnability' ? : string,
        'enthusiasm' ? : string,
        'mentorRate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/user/{username}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{username}', `${parameters['username']}`);

            if (parameters['username'] === undefined) {
                reject(new Error('Missing required  parameter: username'));
                return;
            }

            if (parameters['skills'] !== undefined) {
                queryParameters['Skills'] = parameters['skills'];
            }

            if (parameters['learnability'] !== undefined) {
                queryParameters['Learnability'] = parameters['learnability'];
            }

            if (parameters['enthusiasm'] !== undefined) {
                queryParameters['Enthusiasm'] = parameters['enthusiasm'];
            }

            if (parameters['mentorRate'] !== undefined) {
                queryParameters['Mentor Rate'] = parameters['mentorRate'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getMentorsURL(parameters: {
        'mentorname': string,
        'experience': string,
        'course': string,
        'rating': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/mentors';
        if (parameters['mentorname'] !== undefined) {
            queryParameters['mentorname'] = parameters['mentorname'];
        }

        if (parameters['experience'] !== undefined) {
            queryParameters['experience'] = parameters['experience'];
        }

        if (parameters['course'] !== undefined) {
            queryParameters['course'] = parameters['course'];
        }

        if (parameters['rating'] !== undefined) {
            queryParameters['rating'] = parameters['rating'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * This can only be done by the logged in user.
     * @method
     * @name ProductService#getMentors
     * @param {string} mentorname - Mentor name 
     * @param {string} experience - An experience of a mentors
     * @param {string} course - Mentor course 
     * @param {string} rating - Short list of rating,and common rating of Mentor 
     */
    getMentors(parameters: {
        'mentorname': string,
        'experience': string,
        'course': string,
        'rating': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/mentors';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['mentorname'] !== undefined) {
                queryParameters['mentorname'] = parameters['mentorname'];
            }

            if (parameters['mentorname'] === undefined) {
                reject(new Error('Missing required  parameter: mentorname'));
                return;
            }

            if (parameters['experience'] !== undefined) {
                queryParameters['experience'] = parameters['experience'];
            }

            if (parameters['experience'] === undefined) {
                reject(new Error('Missing required  parameter: experience'));
                return;
            }

            if (parameters['course'] !== undefined) {
                queryParameters['course'] = parameters['course'];
            }

            if (parameters['course'] === undefined) {
                reject(new Error('Missing required  parameter: course'));
                return;
            }

            if (parameters['rating'] !== undefined) {
                queryParameters['rating'] = parameters['rating'];
            }

            if (parameters['rating'] === undefined) {
                reject(new Error('Missing required  parameter: rating'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getMentorURL(parameters: {
        'mentorname': string,
        'surname' ? : string,
        'nickname' ? : string,
        'experience' ? : string,
        'passedPeople' ? : string,
        'value' ? : string,
        'rating' ? : string,
        'place' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/mentors/{mentorname}';

        path = path.replace('{mentorname}', `${parameters['mentorname']}`);
        if (parameters['surname'] !== undefined) {
            queryParameters['surname'] = parameters['surname'];
        }

        if (parameters['nickname'] !== undefined) {
            queryParameters['nickname'] = parameters['nickname'];
        }

        if (parameters['experience'] !== undefined) {
            queryParameters['Experience'] = parameters['experience'];
        }

        if (parameters['passedPeople'] !== undefined) {
            queryParameters['passed people'] = parameters['passedPeople'];
        }

        if (parameters['value'] !== undefined) {
            queryParameters['value'] = parameters['value'];
        }

        if (parameters['rating'] !== undefined) {
            queryParameters['rating'] = parameters['rating'];
        }

        if (parameters['place'] !== undefined) {
            queryParameters['place'] = parameters['place'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find mentor by name
     * @method
     * @name ProductService#getMentor
     * @param {string} mentorname - The name that needs to be fetched. 
     * @param {string} surname - The surname of the mentor
     * @param {string} nickname - The nickname of the mentor
     * @param {string} experience - The Mentor Experience
     * @param {string} passedPeople - Value of passed people
     * @param {string} value - Number of people mentoring the mentor
     * @param {string} rating - The rating of the mentor
     * @param {string} place - Place mentor in the ranking
     */
    getMentor(parameters: {
        'mentorname': string,
        'surname' ? : string,
        'nickname' ? : string,
        'experience' ? : string,
        'passedPeople' ? : string,
        'value' ? : string,
        'rating' ? : string,
        'place' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/mentors/{mentorname}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{mentorname}', `${parameters['mentorname']}`);

            if (parameters['mentorname'] === undefined) {
                reject(new Error('Missing required  parameter: mentorname'));
                return;
            }

            if (parameters['surname'] !== undefined) {
                queryParameters['surname'] = parameters['surname'];
            }

            if (parameters['nickname'] !== undefined) {
                queryParameters['nickname'] = parameters['nickname'];
            }

            if (parameters['experience'] !== undefined) {
                queryParameters['Experience'] = parameters['experience'];
            }

            if (parameters['passedPeople'] !== undefined) {
                queryParameters['passed people'] = parameters['passedPeople'];
            }

            if (parameters['value'] !== undefined) {
                queryParameters['value'] = parameters['value'];
            }

            if (parameters['rating'] !== undefined) {
                queryParameters['rating'] = parameters['rating'];
            }

            if (parameters['place'] !== undefined) {
                queryParameters['place'] = parameters['place'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    updateMentorURL(parameters: {
        'mentorname': string,
        'name' ? : string,
        'surname' ? : string,
        'experience' ? : string,
        'passedPeople' ? : string,
        'value' ? : string,
        'rating' ? : string,
        'place' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/mentors/{mentorname}';

        path = path.replace('{mentorname}', `${parameters['mentorname']}`);
        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['surname'] !== undefined) {
            queryParameters['surname'] = parameters['surname'];
        }

        if (parameters['experience'] !== undefined) {
            queryParameters['Experience'] = parameters['experience'];
        }

        if (parameters['passedPeople'] !== undefined) {
            queryParameters['passed people'] = parameters['passedPeople'];
        }

        if (parameters['value'] !== undefined) {
            queryParameters['value'] = parameters['value'];
        }

        if (parameters['rating'] !== undefined) {
            queryParameters['rating'] = parameters['rating'];
        }

        if (parameters['place'] !== undefined) {
            queryParameters['place'] = parameters['place'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Updated mentor
     * @method
     * @name ProductService#updateMentor
     * @param {string} mentorname - The name that needs to be fetched. 
     * @param {string} name - The name of the mentor
     * @param {string} surname - The surname of the mentor
     * @param {string} experience - The Mentor Experience
     * @param {string} passedPeople - Value of passed people
     * @param {string} value - Number of people mentoring the mentor
     * @param {string} rating - The rating of the mentor
     * @param {string} place - Place mentor in the ranking
     */
    updateMentor(parameters: {
        'mentorname': string,
        'name' ? : string,
        'surname' ? : string,
        'experience' ? : string,
        'passedPeople' ? : string,
        'value' ? : string,
        'rating' ? : string,
        'place' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/mentors/{mentorname}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{mentorname}', `${parameters['mentorname']}`);

            if (parameters['mentorname'] === undefined) {
                reject(new Error('Missing required  parameter: mentorname'));
                return;
            }

            if (parameters['name'] !== undefined) {
                queryParameters['name'] = parameters['name'];
            }

            if (parameters['surname'] !== undefined) {
                queryParameters['surname'] = parameters['surname'];
            }

            if (parameters['experience'] !== undefined) {
                queryParameters['Experience'] = parameters['experience'];
            }

            if (parameters['passedPeople'] !== undefined) {
                queryParameters['passed people'] = parameters['passedPeople'];
            }

            if (parameters['value'] !== undefined) {
                queryParameters['value'] = parameters['value'];
            }

            if (parameters['rating'] !== undefined) {
                queryParameters['rating'] = parameters['rating'];
            }

            if (parameters['place'] !== undefined) {
                queryParameters['place'] = parameters['place'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    upgradeMentorURL(parameters: {
        'mentorname': string,
        'name' ? : string,
        'surname' ? : string,
        'courses' ? : string,
        'experience' ? : string,
        'contact' ? : string,
        'allPeople' ? : string,
        'rating' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/mentors/{mentorname}';

        path = path.replace('{mentorname}', `${parameters['mentorname']}`);
        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['surname'] !== undefined) {
            queryParameters['surname'] = parameters['surname'];
        }

        if (parameters['courses'] !== undefined) {
            queryParameters['Courses'] = parameters['courses'];
        }

        if (parameters['experience'] !== undefined) {
            queryParameters['experience'] = parameters['experience'];
        }

        if (parameters['contact'] !== undefined) {
            queryParameters['contact'] = parameters['contact'];
        }

        if (parameters['allPeople'] !== undefined) {
            queryParameters['All people'] = parameters['allPeople'];
        }

        if (parameters['rating'] !== undefined) {
            queryParameters['rating'] = parameters['rating'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * This can only be done by the logged in user.
     * @method
     * @name ProductService#upgradeMentor
     * @param {string} mentorname - The name that needs to be fetched. 
     * @param {string} name - The name of the mentor
     * @param {string} surname - The surname of the mentor
     * @param {string} courses - Kind of courses
     * @param {string} experience - The experience of the mentor
     * @param {string} contact - The contact
     * @param {string} allPeople - People who have a mentor
     * @param {string} rating - The rating of mentor
     */
    upgradeMentor(parameters: {
        'mentorname': string,
        'name' ? : string,
        'surname' ? : string,
        'courses' ? : string,
        'experience' ? : string,
        'contact' ? : string,
        'allPeople' ? : string,
        'rating' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/mentors/{mentorname}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{mentorname}', `${parameters['mentorname']}`);

            if (parameters['mentorname'] === undefined) {
                reject(new Error('Missing required  parameter: mentorname'));
                return;
            }

            if (parameters['name'] !== undefined) {
                queryParameters['name'] = parameters['name'];
            }

            if (parameters['surname'] !== undefined) {
                queryParameters['surname'] = parameters['surname'];
            }

            if (parameters['courses'] !== undefined) {
                queryParameters['Courses'] = parameters['courses'];
            }

            if (parameters['experience'] !== undefined) {
                queryParameters['experience'] = parameters['experience'];
            }

            if (parameters['contact'] !== undefined) {
                queryParameters['contact'] = parameters['contact'];
            }

            if (parameters['allPeople'] !== undefined) {
                queryParameters['All people'] = parameters['allPeople'];
            }

            if (parameters['rating'] !== undefined) {
                queryParameters['rating'] = parameters['rating'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    RateUserURL(parameters: {
        'username' ? : string,
        'rate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/UserRate';
        if (parameters['username'] !== undefined) {
            queryParameters['Username'] = parameters['username'];
        }

        if (parameters['rate'] !== undefined) {
            queryParameters['Rate'] = parameters['rate'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * UserRate
     * @method
     * @name ProductService#RateUser
     * @param {string} username - The new rate of the user
     * @param {string} rate - The rate of the user
     */
    RateUser(parameters: {
        'username' ? : string,
        'rate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/UserRate';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['username'] !== undefined) {
                queryParameters['Username'] = parameters['username'];
            }

            if (parameters['rate'] !== undefined) {
                queryParameters['Rate'] = parameters['rate'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getrateURL(parameters: {
        'username' ? : string,
        'rate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/UserRate';
        if (parameters['username'] !== undefined) {
            queryParameters['username'] = parameters['username'];
        }

        if (parameters['rate'] !== undefined) {
            queryParameters['Rate'] = parameters['rate'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * GetRate
     * @method
     * @name ProductService#getrate
     * @param {string} username - The surname of the user
     * @param {string} rate - The Rate of the user
     */
    getrate(parameters: {
        'username' ? : string,
        'rate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/UserRate';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['username'] !== undefined) {
                queryParameters['username'] = parameters['username'];
            }

            if (parameters['rate'] !== undefined) {
                queryParameters['Rate'] = parameters['rate'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    MentorUserURL(parameters: {
        'mentorname' ? : string,
        'rate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/MentorRate';
        if (parameters['mentorname'] !== undefined) {
            queryParameters['Mentorname'] = parameters['mentorname'];
        }

        if (parameters['rate'] !== undefined) {
            queryParameters['Rate'] = parameters['rate'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * MentorRate
     * @method
     * @name ProductService#MentorUser
     * @param {string} mentorname - The new rate of the mentor
     * @param {string} rate - The rate of the mentor
     */
    MentorUser(parameters: {
        'mentorname' ? : string,
        'rate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/MentorRate';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['mentorname'] !== undefined) {
                queryParameters['Mentorname'] = parameters['mentorname'];
            }

            if (parameters['rate'] !== undefined) {
                queryParameters['Rate'] = parameters['rate'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getmentorrateURL(parameters: {
        'username' ? : string,
        'rate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/MentorRate';
        if (parameters['username'] !== undefined) {
            queryParameters['username'] = parameters['username'];
        }

        if (parameters['rate'] !== undefined) {
            queryParameters['Rate'] = parameters['rate'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * GetRate
     * @method
     * @name ProductService#getmentorrate
     * @param {string} username - The surname of the mentor
     * @param {string} rate - The Rate of the mentor
     */
    getmentorrate(parameters: {
        'username' ? : string,
        'rate' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/MentorRate';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['username'] !== undefined) {
                queryParameters['username'] = parameters['username'];
            }

            if (parameters['rate'] !== undefined) {
                queryParameters['Rate'] = parameters['rate'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

}
