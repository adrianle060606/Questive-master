import React from 'react';

const Points = () => (
  <div>
    <div className = "about">
        <h3>How Do I Earn Points?</h3>
        <p>Currently there is only a single way to earn points and that is by answering the daily problem. No matter how long you take, you get <b>5 points</b> just for answering the problem. If it is the second day in a row you answer the problem correctly then it is <b>7 points</b>, three days in a row is <b>11 points</b>, and so on, increasing by <b>2 points</b> each time. This bonus caps out at <b>19 points</b>.</p>
        <p>There are also bonuses for being fast. You get more points for being in the top 10:</p>
        <table>
            <tbody>
                <tr>
                    <th>Position</th>
                    <th>Bonus Points</th>
                </tr>

                <tr>
                    <th>1st</th>
                    <th>10</th>
                </tr>
                <tr>
                    <th>2nd</th>
                    <th>8</th>
                </tr>

                <tr>
                    <th>3rd</th>
                    <th>6</th>
                </tr>

                <tr>
                    <th>4th</th>
                    <th>5</th>
                </tr>

                <tr>
                    <th>5th</th>
                    <th>4</th>
                </tr>

                <tr>
                    <th>6th</th>
                    <th>3</th>
                </tr>

                <tr>
                    <th>7th</th>
                    <th>2</th>
                </tr>

                <tr>
                    <th>8th</th>
                    <th>1</th>
                </tr>

                <tr>
                    <th>9th</th>
                    <th>1</th>
                </tr>

                <tr>
                    <th>10th</th>
                    <th>1</th>
                </tr>
            </tbody>
        </table>

        <p>You get further bonuses for performing well multiple times in a row.</p>
        <p>For example if you get 1st 2 times in a row then you get 5 more points on top of everything else. This 5 comes from the number of points you get from 1st normally (10) divided by 2. If you come 1st 3 times in a row then you get 5 + 5 = 10 more points on top of everything else. 4 times in a row = 15 more points, and so on.
            If you come 2nd 2 times in a row then you get 4 more points (8 / 2 = 4). 3 times in a row = 8 points, then 12 points, and so on.
            You simply halve the bonus points you would get in the table above, divide it by two, you then mutliply by the n - 1, and then round up if necessary (it is important to note that the rounding happens after the multiplication), where n is the number of times in a row you have come that position.</p>
        <p>It is unlikely that you will come exactly 4th n-times in a row. So instead, your "rank streak" is considered whichever rank is the lowest out of your streak. As in coming 3rd then 4th then 1st is the same as coming 4th then 4th then 4th (in terms of these bonus points, the normal rank bonus is different as per the above table).</p>
        <p>However, this could lead to cases where it would be beneficial to miss a question. For example if you get 10th and then 10th and then 1st and then 1st that would be worth 4 bonus points in the standard system. But if you came 10th and then did not answer and then 1st and then 1st then that would be 5 bonus points, as discussed earlier. For this reason an algorithm will cut your streak off at a point such that it maximises your bonus points. That way <u>it is always beneficial to answer and do well on a question.</u></p>
        <p>This "rank-streak" bonus points caps out at 30 points.</p>
        <p>A tabular summary of "rank-streak" bonus points:</p>
        <table>
            <tbody>
                <tr>
                    <th>Position | Streak</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                </tr>

                <tr>
                    <th>1st</th>
                    <th>0</th>
                    <th>5</th>
                    <th>10</th>
                    <th>15</th>
                    <th>20</th>
                    <th>25</th>
                    <th>30</th>
                    <th>30</th>
                    <th>30</th>
                    <th>30</th>
                </tr>
                <tr>
                    <th>2nd</th>
                    <th>0</th>
                    <th>4</th>
                    <th>8</th>
                    <th>12</th>
                    <th>16</th>
                    <th>20</th>
                    <th>24</th>
                    <th>28</th>
                    <th>30</th>
                    <th>30</th>
                </tr>

                <tr>
                    <th>3rd</th>
                    <th>0</th>
                    <th>3</th>
                    <th>6</th>
                    <th>9</th>
                    <th>12</th>
                    <th>15</th>
                    <th>18</th>
                    <th>21</th>
                    <th>24</th>
                    <th>27</th>
                </tr>

                <tr>
                    <th>4th</th>
                    <th>0</th>
                    <th>3</th>
                    <th>5</th>
                    <th>8</th>
                    <th>10</th>
                    <th>13</th>
                    <th>15</th>
                    <th>18</th>
                    <th>20</th>
                    <th>23</th>
                </tr>

                <tr>
                    <th>5th</th>
                    <th>0</th>
                    <th>2</th>
                    <th>4</th>
                    <th>6</th>
                    <th>8</th>
                    <th>10</th>
                    <th>12</th>
                    <th>14</th>
                    <th>16</th>
                    <th>18</th>
                </tr>

                <tr>
                    <th>6th</th>
                    <th>0</th>
                    <th>2</th>
                    <th>3</th>
                    <th>5</th>
                    <th>6</th>
                    <th>8</th>
                    <th>9</th>
                    <th>11</th>
                    <th>12</th>
                    <th>14</th>
                </tr>

                <tr>
                    <th>7th</th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                </tr>

                <tr>
                    <th>8th</th>
                    <th>0</th>
                    <th>1</th>
                    <th>1</th>
                    <th>2</th>
                    <th>2</th>
                    <th>3</th>
                    <th>3</th>
                    <th>4</th>
                    <th>4</th>
                    <th>5</th>
                </tr>

                <tr>
                    <th>9th</th>
                    <th>0</th>
                    <th>1</th>
                    <th>1</th>
                    <th>2</th>
                    <th>2</th>
                    <th>3</th>
                    <th>3</th>
                    <th>4</th>
                    <th>4</th>
                    <th>5</th>
                </tr>

                <tr>
                    <th>10th</th>
                    <th>0</th>
                    <th>1</th>
                    <th>1</th>
                    <th>2</th>
                    <th>2</th>
                    <th>3</th>
                    <th>3</th>
                    <th>4</th>
                    <th>4</th>
                    <th>5</th>
                </tr>
            </tbody>
        </table>
        <p>A hard cap of 30 points per question is applied to the points per question.</p>
        <h3>What Is The <i>Point</i> Of Earning Points?</h3>
        <p>Firstly, it gives you bragging rights. I can not think of a more prestigious and commendable position than ranking first in the Questive leaderboards. But, there will also be prizes! These are still to be determined but will be awarded to the top three rankers at the end of the term.</p>
    </div>
  </div>
);

export default Points;
