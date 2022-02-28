describe('Interactions between Vision 3 and Vision Anywhere', () => {
    describe('Logged into Vision 3 with patient X selected', () => {
        it('should be at least one test so JEst can run', () => {
            expect(1).toEqual(1)
        })
        it.todo('should pass patient context from V3 to VA')
        it.todo('should update state services when a patient is deselected')
        it.todo('should update state services when a patient is selected')
        it.todo(
            'should update state services when a second patient is selected in CM'
        )
        it.todo(
            'should listen for changes to the state services and alert the user of a change'
        )
        it.todo(
            "should check the state services if it can't receive changes from the web sockets"
        )
    })
    describe('Logged into V3 without a patient select', () => {
        it.todo(
            'should listen for changes to the state services and alert the user is a patient is already selected in another app'
        )
        it.todo(
            "should check state services if it can't receive changes from the web sockets and alert users is a patient is selected"
        )
    })
    describe('Logged into VA with patient selected', () => {
        // Same as V3?
    })
    describe('Logged into VA witout a patient selected', () => {
        // Same as V3?
    })
    describe('Logged into VA launching mail manager', () => {
        it.todo('should load mail manager with the selected patient in context')
    })
    describe('Mail Manager launched from VA', () => {
        it.todo(
            'should check the state service to see if a patient is selected and alert the user'
        )
    })
    describe('Logged into a third party app Vision not running, but signed in with the Vision Login Helper', () => {
        it.todo(
            'should not know whether a patient selected, but it could check'
        )
    })
})
