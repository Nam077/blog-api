#include <bits/stdc++.h>

using namespace std;

bool solution(int arr[], int n)
{
    map<int, int> mp;
    for (int i = 0; i < n; i++)
    {
        mp[arr[i]]++;
    }
    if (mp.size() > 2)
    {
        return false;
    }
    // find minimum map
    int min = mp.begin()->second;
    for (auto i : mp)
    {
        if (i.second < min)
        {
            min = i.second;
        }
    }

    if (min == 1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

int main()
{
    int n;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++)
    {
        cin >> arr[i];
    }

    if (solution(arr, n))
    {
        cout << "YES";
    }
    else
    {
        cout << "NO";
    }
    return 0;
}