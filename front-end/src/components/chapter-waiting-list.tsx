import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {cn} from "@/lib/utils";
import {useContractRead} from "wagmi";
import {wagmiFeedbackContract} from "@/config/wagmi";
import {Chapter} from "@/types/chapter";
import {Button} from "@/components/ui/button";
import {ButtonRejectWaitingList} from "@/components/button-reject-waiting-list";
import {AcceptOrRejectWhitelist} from "@/components/accept-or-reject-whitelist";

const activity = [
    { id: 1, type: 'created', address: 'Alex Curren', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
    { id: 2, type: 'edited', address: 'Alex Curren', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
    { id: 3, type: 'sent', address: 'Alex Curren', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
    {
        id: 4,
        type: 'commented',
        address: 'Alex Curren',
        person: {
            name: 'Chelsea Hagon',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
        date: '3d ago',
        dateTime: '2023-01-23T15:56',
    },
    { id: 5, type: 'viewed',  person: {
            name: 'Chelsea Hagon'}, address: 'Alex Curren', date: '2d ago', dateTime: '2023-01-24T09:12' },
    { id: 6, type: 'paid', person: {
            name: 'Chelsea Hagon'},  address: 'Alex Curren', date: '1d ago', dateTime: '2023-01-24T09:20' },
];

interface Props {
    data: Array<any>
    chapter: Chapter;
}

export default function ChapterWaitingList({data, chapter}: Props) {

    // acceptWaitingList
    // rejectWaitingList

    return (
        <>
            <ul role="list" className="space-y-6 mx-auto w-1/2 pb-24 sm:pb-24 max-w-2xl flex-shrink-0 lg:max-w-xl">
                {data?.map((waitingList, index) => (
                    <li key={waitingList.id} className="relative flex gap-x-4">
                        <div
                            className={cn(
                                index === activity.length - 1 ? 'h-6' : '-bottom-6',
                                'absolute left-0 top-0 flex w-6 justify-center'
                            )}
                        >
                            <div className="w-px bg-background" />
                        </div>
                        {/*{waitlist.type === 'commented' ? (*/}
                        {/*    <>*/}
                        {/*        <img*/}
                        {/*            src={waitlist.person.imageUrl}*/}
                        {/*            alt=""*/}
                        {/*            className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"*/}
                        {/*        />*/}
                        {/*        <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-700">*/}
                        {/*            <div className="flex justify-between gap-x-4">*/}
                        {/*                <div className="py-0.5 text-xs leading-5 text-gray-500">*/}
                        {/*                    <span className="font-medium text-gray-100">{activityItem.address}</span> commented*/}
                        {/*                </div>*/}
                        {/*                <time dateTime={activityItem.dateTime} className="flex-none py-0.5 text-xs leading-5 text-gray-500">*/}
                        {/*                    {activityItem.date}*/}
                        {/*                </time>*/}
                        {/*            </div>*/}
                        {/*            <p className="text-sm leading-6 text-gray-500">{activityItem.comment}</p>*/}
                        {/*        </div>*/}
                        {/*    </>*/}
                        {/*) : (*/}
                            <>
                                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-background">
                                    {waitingList.status === 'paid' ? (
                                        <CheckCircleIcon className="h-6 w-6 text-primary/50" aria-hidden="true" />
                                    ) : (
                                        <div className="h-1.5 w-1.5 rounded-full bg-background ring-1 ring-gray-600" />
                                    )}
                                </div>
                                <p className="flex-auto py-0.5 text-xs leading-5 text-primary/50">
                                    <span className="font-medium text-primary">{waitingList.owner}</span> want to give feedback.
                                </p>
                                <AcceptOrRejectWhitelist waitingList={waitingList} />
                                {/*<time dateTime={waitingList.dateTime} className="flex-none py-0.5 text-xs leading-5 text-gray-500">*/}
                                {/*    {waitingList.date}*/}
                                {/*</time>*/}
                            </>
                        {/*)}*/}
                    </li>
                ))}
            </ul>
        </>
    )
}
