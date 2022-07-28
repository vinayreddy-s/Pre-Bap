import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';


export const routeTransitionAnimations =
    trigger('slideTransition',
        [
            transition('login => dashboard, companyappform => viewcompanyappform,idcardform => viewidcardform,mediclaimform => viewmediclaimform,formf => viewformf,formeleven => viewformeleven,formtwo => viewformtwo, bankdetails => viewbankdetails,welfaredetails => viewwelfaredetails, landingpage => viewfaq',
                [
                    style({ position: 'relative' }),
                    query(':enter, :leave', [style({ position: 'absolute', top: 0, right: 0, width: '100%' })]),
                    query(':enter', [style({ right: '-100%' })]),
                    query(':leave', animateChild()),
                    group([
                        query(':leave', [animate('300ms ease-in', style({ right: '100%' }))]),
                        query(':enter', [animate('300ms ease-in', style({ right: '0%' }))])
                    ]),
                    query(':enter', animateChild()),
                ]
            ),
            transition('dashboard => login, viewcompanyappform => companyappform,viewidcardform => idcardform,viewmediclaimform => mediclaimform,viewformf => formf,viewformeleven => formeleven,viewformtwo => formtwo,viewbankdetails => bankdetails,viewwelfaredetails => welfaredetails, viewfaq => landingpage',
                [
                    style({ position: 'relative' }),
                    query(':enter, :leave', [style({ position: 'absolute', top: 0, right: 0, width: '100%' })]),
                    query(':enter', [style({ left: '-100%' })]),
                    query(':leave', animateChild()),
                    group([
                        query(':leave', [animate('300ms ease-in', style({ right: '-100%' }))]),
                        query(':enter', [animate('300ms ease-in', style({ left: '0%' }))])
                    ]),
                    query(':enter', animateChild()),
                ]
            )
        ]
    );
