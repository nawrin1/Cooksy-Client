/* eslint-disable prettier/prettier */

"use client"
import Payment from "@/src/components/UI/Payment";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import React from "react";

const Membership = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="bg-gray-100 py-12 font-Peyda">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Become a Premium Member
        </h2>
        <p className="text-xl text-gray-500 mb-8">
          Unlock exclusive benefits and elevate your experience by becoming a
          premium member. Enjoy priority access, special features, and much more
          for just{" "}
          <span className="font-semibold text-gray-900">$19.99/month</span>.
        </p>

        <div className="bg-white shadow-md rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Premium Membership Benefits:
          </h3>
          <ul className="text-left text-gray-600 mb-6 space-y-2">
            <li>
              <span className="inline-block text-green-500 mr-2">✓</span>
              Priority support
            </li>
            <li>
              <span className="inline-block text-green-500 mr-2">✓</span>Access
              to premium content
            </li>
            
            <li>
              <span className="inline-block text-green-500 mr-2">✓</span>Ad-free
              experience
            </li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            Ready to take your experience to the next level? Join our premium
            community and enjoy all these perks for just{" "}
            <span className="font-semibold">$19.99/month</span>.
          </p>


          <Button color="warning" variant="bordered" onPress={onOpen}>Upgrade To Premium</Button>
      <Modal
        backdrop="opaque" 
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }} 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
            
              <Payment/>
              <ModalBody />
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
          {/* <button className="w-full bg-green-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition-colors">
            Upgrade to Premium
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Membership;
