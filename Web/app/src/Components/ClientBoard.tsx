import React, { useEffect, useState } from "react";
import DashboardPage from "../Pages/DashboardPage";
import UpdateContract from "../modals/UpdateContract";
import DeleteClient from "../modals/DeleteClient";
import CreateContract, { ContractDetails } from "../modals/CreateContract";
import { UserLogin } from "../Types/UserLogin";
import { TabTitle } from "../utils/GeneralFunctions";

export type Plan = {
  title: string;
};

export type ContractPayment = {
  id: number;
  contractId: number;
  clientId: number;
  link: string;
  amount: number;
  paymentDate: Date;
};

export type Contract = {
  id: number;
  clientId: number;
  seoId: number;
  type: number;
  plan: number;
  status: number;
  managedBy: string;
  dateCreated: Date;
  dateUpdated: Date;
};

export type ContractUserDetails = {
  id: number;
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
};

export type ContractFullDetails = {
  contract: Contract;
  userDetails: ContractUserDetails;
  contractPayment: ContractPayment;
};

const paymentPlanStrings: string[] = ["Open", "6 months", "1 year"];
const paymentType: string[] = ["Full Payment", "2 months advance"];

function ClientBoard({ userDetail, isSignedIn }: UserLogin) {
  const [contracts, setContracts] = useState<ContractDetails[]>([]);

  //Page Title
  TabTitle("Client - SearchWorks");

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/Contracts/contract/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const contractDetails = await res.json();
      setContracts(contractDetails);
      console.log({ contractDetails });
    };

    fetchData();
  };
  
  return (
    <DashboardPage user={userDetail} isSignedIn={isSignedIn}>
      <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-790 drop-shadow rounded-md m-4">
        {userDetail.roles[0] === "ContentWriter" ||
        userDetail.roles[0] === "SeoSpecialist" ||
        userDetail.roles[0] === "ContentManager" ||
        userDetail.roles[0] === "WebDeveloper" ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-md">
            <table className="w-full text-sm text-left text-black">
              <thead className="text-xs uppercase bg-gray-800 text-white">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SEO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Contract Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Plan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Managed By
                  </th>
                </tr>
              </thead>
              <tbody>
                {contracts == null
                  ? []
                  : contracts.map((contract) => (
                      <tr className="bg-white border-b dark:bg-white dark:border-gray-300 hover:bg-slate-300">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-search-1"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="checkbox-table-search-1"
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <th
                          scope="row"
                          className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {contract.clientEmail}
                        </th>
                        <th
                          scope="row"
                          className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {"tbd"}
                        </th>
                        <th
                          scope="row"
                          className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {paymentPlanStrings[contract.plan]}
                        </th>
                        <th
                          scope="row"
                          className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {paymentType[contract.type]}
                        </th>
                        <td className="px-6 py-4">
                          {contract.paymentDate != null ? (
                            <p className="bg-green-500 rounded-lg p-1 w-20 text-center">
                              Paid
                            </p>
                          ) : (
                            <p className="bg-gray-500 rounded-lg p-1 w-20 text-center">
                              Not Paid
                            </p>
                          )}
                        </td>
                        <th
                          scope="row"
                          className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          ₱{contract.paymentAmount.toString()}
                        </th>
                        <th
                          scope="row"
                          className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {new Date(contract.paymentDate).toLocaleString()}
                        </th>
                        <td className="px-6 py-4">{contract.managedBy}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="flex justify-start flex-row items-center mb-8 w-64">
              <CreateContract />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-md">
              <table className="w-full text-sm text-left text-black">
                <thead className="text-xs uppercase bg-gray-800 text-white">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 bg-gray-700border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-all-search"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-3">
                      SEO
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Contract Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Plan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Managed By
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contracts == null
                    ? []
                    : contracts.map((contract) => (
                        <tr className="bg-white border-b dark:bg-white dark:border-gray-300 hover:bg-slate-300">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-search-1"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="checkbox-table-search-1"
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
                          <th
                            scope="row"
                            className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                          >
                            {contract.clientEmail}
                          </th>
                          <th
                            scope="row"
                            className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                          >
                            {contract.seoEmail}
                          </th>
                          <th
                            scope="row"
                            className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                          >
                            {paymentPlanStrings[contract.plan]}
                          </th>
                          <th
                            scope="row"
                            className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                          >
                            {paymentType[contract.type]}
                          </th>
                          <td className="px-6 py-4">
                            {contract.paymentDate != null ? (
                              <p className="bg-green-500 rounded-lg p-1 w-20 text-center">
                                Paid
                              </p>
                            ) : (
                              <p className="bg-gray-500 rounded-lg p-1 w-20 text-center">
                                Not Paid
                              </p>
                            )}
                          </td>
                          <th
                            scope="row"
                            className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                          >
                            ₱{contract.paymentAmount.toString()}
                          </th>
                          <th
                            scope="row"
                            className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                          >
                            {new Date(contract.paymentDate).toDateString()}
                          </th>
                          <td className="px-6 py-4">{contract.managedBy}</td>
                          <td className="flex items-center px-6 py-4 space-x-3">
                            <UpdateContract updateHandler={refreshData} />
                            <DeleteClient user={userDetail} updateHandler={refreshData} />
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </DashboardPage>
  );
}

export default ClientBoard;
