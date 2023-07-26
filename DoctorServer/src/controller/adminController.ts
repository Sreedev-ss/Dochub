import { Request, Response } from 'express';
import { AppointmentModel } from '../models/appointment';

export const getAllPatientCount = async (req: Request, res: Response) => {
    try {
        const patients = await AppointmentModel.aggregate([
            {
                $group: {
                    _id: '$gender',
                    total: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    gender: '$_id',
                    total: 1,
                },
            },
        ]);
        res.json(patients)

    } catch (error) {
        console.log('Error occurred during fetching patients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getFullRevenue = async (req: Request, res: Response) => {
    try {
        const revenue = await AppointmentModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: { $toInt: '$fees' } },
                },
            },
        ]);

        res.json(revenue)
    } catch (error) {
        console.log('Error occurred during fetching total revenue by doctor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getFullMontlyRevenue = async (req: Request, res: Response) => {
    try {

        const result = await AppointmentModel.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: { $toDate: '$date' } },
                        year: { $year: { $toDate: '$date' } },
                    },
                    revenue: { $sum: { $toDouble: '$fees' } },
                },
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                },
            },
        ]);
        const monthlyRevenueArray = Array(12).fill(0);

        result.forEach((item) => {
            const monthIndex = item._id.month - 1;
            monthlyRevenueArray[monthIndex] = item.revenue;
        });

        res.json({result,monthlyRevenueArray})
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

export const getFullYearRevenue = async(req: Request, res: Response) => {
    try {

        const result = await AppointmentModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: { $toDate: '$date' } },
                    },
                    revenue: { $sum: { $toDouble: '$fees' } },
                },
            },
            {
                $sort: {
                    '_id.year': 1,
                },
            },
        ]);

        const yearlyRevenueArray = Array(4).fill(0);

        result.forEach((item,i) => {
            yearlyRevenueArray[4-i] = item.revenue;
        });

        res.json({result,yearlyRevenueArray})
     
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const fullSymptomTypes =  async(req:Request, res:Response) => {
    try {
        const symptomType = await AppointmentModel.aggregate([
           
            {
                $group: {
                  _id: '$symptoms', 
                  count: { $sum: 1 }, 
                },
              },
        ])
        res.json(symptomType)
    } catch (error) {
        res.status(500).json({error:'Internal server error'})
    }
}