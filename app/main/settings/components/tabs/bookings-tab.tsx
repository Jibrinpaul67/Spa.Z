"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BookingSettings } from "../../types/settings";
import { BankDetailsModal } from "../modals/bank-details-modal";

import { CreditCard, Landmark } from "lucide-react";
import { RichTextEditor } from "@/components/ui/richtexteditor";

interface BookingsTabProps {
  initialData: BookingSettings;
  onSave: (data: BookingSettings) => void;
}

export function BookingsTab({ initialData, onSave }: BookingsTabProps) {
  const [data, setData] = useState(initialData);
  const [bankModalOpen, setBankModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(data);
  };

  const handleBankDetails = (bankName: string, accountNumber: string) => {
    setData({
      ...data,
      paymentMethods: {
        ...data.paymentMethods,
        bankTransfer: true,
        bankDetails: {
          bankName,
          accountNumber,
        },
      },
    });
  };

  const handleBankTransferChange = (checked: boolean) => {
    if (checked && !data.paymentMethods.bankDetails) {
      setBankModalOpen(true);
    } else {
      setData({
        ...data,
        paymentMethods: {
          ...data.paymentMethods,
          bankTransfer: checked,
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-none">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-[0.92rem] font-semibold text-purple-600">
                Minimum Notice Period for booking
              </h2>
              <p className="text-[0.85rem] w-full md:w-1/2 leading-6 text-muted-foreground mt-1">
                Set the required lead time users must provide before making a
                booking to ensure proper planning and availability.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Select
                value={data.minimumNotice.toString()}
                onValueChange={(value) =>
                  setData({ ...data, minimumNotice: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select notice period" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 5, 7, 14, 30].map((days) => (
                    <SelectItem key={days} value={days.toString()}>
                      {days} {days === 1 ? "Day" : "Days"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-[0.92rem] font-semibold text-purple-600">
                Cancellation Policy
              </h2>
              <p className="text-[0.85rem] w-full md:w-1/2 leading-6 text-muted-foreground mt-1">
                Define the rules and timeframes for users to cancel bookings,
                including potential fees or penalties for late cancellations.
              </p>
            </div>
            <RichTextEditor
              value={data.cancellationPolicy}
              onChange={(value) =>
                setData({ ...data, cancellationPolicy: value })
              }
              
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-[0.92rem] font-semibold text-purple-600">
                Payment Method
              </h2>
              <p className="text-[0.85rem] w-full md:w-1/2 leading-6 text-muted-foreground mt-1">
                Manage and configure accepted payment options, including credit
                cards, bank transfers, and other supported payment gateways.
              </p>
            </div>
            <div className="gap-4  md:gap-2 w-full md:w-1/2 flex flex-col md:flex-row">
              <div
                className={`flex items-center space-x-4 w-full pl-3 py-6 border rounded-md ${
                  data.paymentMethods.creditCard
                    ? "border-purple-500"
                    : "border-gray-300"
                }`}
              >
                <Checkbox
                  id="credit-card"
                  checked={data.paymentMethods.creditCard}
                  onCheckedChange={(checked) =>
                    setData({
                      ...data,
                      paymentMethods: {
                        ...data.paymentMethods,
                        creditCard: checked as boolean,
                      },
                    })
                  }
                />
                <Label
                  htmlFor="credit-card"
                  className="flex flex-col justify-start items-start gap-1"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="text-xs">Credit Card</span>
                </Label>
              </div>

              <div
                className={`flex items-center space-x-4 w-full pl-3 py-6 border rounded-md ${
                  data.paymentMethods.bankTransfer
                    ? "border-purple-500"
                    : "border-gray-300"
                }`}
              >
                <Checkbox
                  id="bank-transfer"
                  checked={data.paymentMethods.bankTransfer}
                  onCheckedChange={(checked) =>
                    handleBankTransferChange(checked as boolean)
                  }
                />
                <Label
                  htmlFor="bank-transfer"
                  className="flex flex-col justify-start items-start gap-1"
                >
                  <Landmark className="h-5 w-5" />
                  <span className="text-xs">Bank Transfer</span>
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-start">
        <Button onClick={handleSubmit}>Save Changes</Button>
      </div>

      <BankDetailsModal
        isOpen={bankModalOpen}
        onClose={() => setBankModalOpen(false)}
        onSubmit={handleBankDetails}
      />
    </div>
  );
}
