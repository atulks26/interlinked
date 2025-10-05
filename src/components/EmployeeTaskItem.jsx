import React from "react";

const EmployeeTaskItem = () => {
    return (
        <div className="flex flex-col border-2 border-gray-200 my-4">
            <div className="flex gap-4 p-4">
                <div className="flex flex-col w-[75%]">
                    {/* for title, desc, and open link */}
                    <div className="text-3xl pt-1 pb-1">Task Title</div>
                    <div className="text">This is the task description</div>
                </div>

                <div className="flex w-[40%] gap-2 justify-center align-center">
                    {/* for buttons*/}
                    <button className="text-sm border-2 border-gray-300 bg-gray-100 p-4 pt-1 pb-1 mt-auto mb-auto mr-2 ">
                        Open
                    </button>
                    {/* <div className="flex justify-center items-center">
                        Progress
                    </div> */}
                    <button className="text-sm border-2 border-gray-300 bg-gray-100 p-2 pt-1 pb-1 mt-auto mb-auto mr-2">
                        Mark as Completed
                    </button>
                </div>
            </div>

            <div className="flex gap-4 p-4">
                <div className="text-xl">Task Details:</div>
                <div></div>
            </div>
        </div>
    );
};

export default EmployeeTaskItem;
